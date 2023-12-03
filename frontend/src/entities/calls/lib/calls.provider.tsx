import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { ChatEvents, ChatSocketListener, chatSocket } from 'entities/chats';
import { selectSocketStatus, selectUserData } from 'entities/session';
import { FC, ReactNode, createContext, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useStopwatch } from 'react-timer-hook';
import { useAppSelector } from 'shared/model';
import { IconWrapper } from 'shared/ui';
import Peer from 'simple-peer';
import { twMerge } from 'tailwind-merge';
import { AnswerOnCall, CallModal } from '../ui';
import { useCallState, useCallerState, useLocalMediaState, useReceiverState, useRemoteMediaState } from './calls.hook';
import { CallAnswerEventData, CallOfferEventData, CallUpdateEventData } from './types';

type Async<T> = T extends (...args: infer P) => infer R
  ? R extends PromiseLike<any>
    ? (...args: P) => R
    : (...args: P) => Promise<R>
  : never;

interface CallsContextType {
  callUser: Async<(options: { userId: string; receiverName: string; isVideoCall: boolean }) => void>;
  callAnswer: Async<(verdict: 'accept' | 'cancel') => Promise<void>>;
  callEnd: Async<() => void>;
  //TODO реализовать проверку - занят ли пользователь другим разговором.
  //TODO реализовать проверку перед началом звонка - находится ли пользователь в сети.
}

export const CallsContext = createContext<CallsContextType | null>(null);

interface CallsProviderProps {
  children: ReactNode;
}

export const CallsProvider: FC<CallsProviderProps> = ({ children }) => {
  // prettier-ignore
  const {
    open,          setOpen,
    receivingCall, setReceivingCall,
    verdict,       setVerdict,
    callWithVideo, setCallWithVideo,

    resetCallState,
  } = useCallState();

  // prettier-ignore
  const {
    callerId,     setCallerId,
    callerName,   setCallerName,
    callerSignal, setCallerSignal,
    callerIsMe,   setCallerIsMe,

    resetCallerState
  } = useCallerState();

  // prettier-ignore
  const {
    receiverId,   setReceiverId,
    receiverName, setReceiverName,
    receiverIsMe, setReceiverIsMe,

    resetReceiverState
  } = useReceiverState();

  // prettier-ignore
  const {
    remoteStream,         setRemoteStream,
    isRemoteAudioEnabled, setIsRemoteAudioEnabled,
    isRemoteVideoEnabled, setIsRemoteVideoEnabled,

    resetRemoteMediaState,
    remoteVideoRef,
    
  } = useRemoteMediaState();

  // prettier-ignore
  const {
    isLocalVideoEnabled, setIsLocalVideoEnabled,
    isMicrophoneActive,  setIsMicrophoneActive,
    localStream,         setLocalStream,
    localVideoRef,
    
    resetLocalMediaState,
  } = useLocalMediaState();

  const {
    seconds,
    minutes,
    hours,
    start: startTimer,
    pause: pauseTimer,
    totalSeconds,
  } = useStopwatch({ autoStart: false });

  const connectionRef = useRef<Peer.Instance>();
  const connectionStatus = useAppSelector(selectSocketStatus);
  const user = useAppSelector(selectUserData);

  const socketListener = useRef(new ChatSocketListener());

  const updateCallStatus = (options: { isVideoEnabled: boolean; isAudioEnabled: boolean }) => {
    const messageBody: CallUpdateEventData = {
      to: callerId ? callerId : receiverId,
      from: user._id,
      ...options,
    };
    chatSocket.emit(ChatEvents.CALL_UPDATE, messageBody);
  };

  const toggleActiveMicrophone = () => {
    const newValue = !isMicrophoneActive;
    setIsMicrophoneActive(newValue);
    localStream.getAudioTracks().forEach((track) => (track.enabled = newValue));
    updateCallStatus({ isAudioEnabled: newValue, isVideoEnabled: isLocalVideoEnabled });
  };

  const toggleActiveVideoCamera = () => {
    const newValue = !isLocalVideoEnabled;
    localStream.getVideoTracks().forEach((track) => (track.enabled = newValue));
    setIsLocalVideoEnabled(newValue);
    updateCallStatus({ isVideoEnabled: newValue, isAudioEnabled: isMicrophoneActive });
  };

  const getStream = async (video: boolean) => {
    /**
     * Лучше сразу добавлять видео и аудио, потому что если мы заходим включить видеопоток
     * при аудиозвонке, а видео в стриме будет отключено, то придется пересоздавать медиа поток.
     */
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

    setIsMicrophoneActive(true);
    setIsLocalVideoEnabled(video);

    /**
     * Здесь мы сразу отключаем все треки видео и только потом возвращаем стрим.
     */
    if (!video) {
      stream.getVideoTracks().forEach((track) => (track.enabled = false));
    }

    setLocalStream(stream);
    localVideoRef.current.srcObject = stream;
    return stream;
  };

  const cleanup = useCallback(() => {
    pauseTimer();
    resetCallState();
    resetCallerState();
    resetReceiverState();
    resetRemoteMediaState();
    resetLocalMediaState();

    connectionRef.current?.destroy();
  }, []);

  const callUser = async (options: { userId: string; receiverName: string; isVideoCall: boolean }) => {
    try {
      console.log(options);
      const { isVideoCall, receiverName, userId: receiverUserId } = options;
      setOpen(true);
      setCallerIsMe(true);
      setReceiverName(receiverName);
      setReceiverId(receiverUserId);
      setCallWithVideo(isVideoCall);
      const stream = await getStream(isVideoCall);

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (signalData) => {
        chatSocket.emit(ChatEvents.CALL_OFFER, {
          to: receiverUserId,
          from: user._id,
          signal: signalData,
          isVideoCall,
          name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.name,
        });
      });

      peer.on('close', console.log);
      peer.on('error', console.log);

      peer.on('stream', (stream) => {
        setRemoteStream(stream);
        remoteVideoRef.current.srcObject = stream;
      });

      connectionRef.current = peer;

      updateCallStatus({ isAudioEnabled: true, isVideoEnabled: isVideoCall });
    } catch (error) {
      console.log(error);
    }
  };

  const callAnswer = async (verdict: 'accept' | 'cancel') => {
    try {
      setReceiverIsMe(true);
      setVerdict(verdict);
      if (verdict === 'accept') {
        const stream = await getStream(callWithVideo);

        updateCallStatus({ isAudioEnabled: true, isVideoEnabled: callWithVideo });

        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        connectionRef.current = peer;

        peer.on('signal', (signal) => {
          chatSocket.emit(ChatEvents.CALL_ANSWER, { to: callerId, signal, verdict });
        });

        peer.on('close', console.log);
        peer.on('error', console.log);

        peer.on('stream', (stream) => {
          setRemoteStream(stream);
          if (callWithVideo) {
            setIsRemoteVideoEnabled(true);
          }
          remoteVideoRef.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        startTimer();
      } else {
        chatSocket.emit(ChatEvents.CALL_ANSWER, { to: callerId, verdict });
        cleanup();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callEnd = async () => {
    const messageBody = {
      caller: receiverIsMe ? callerId : receiverId,
      to: callerId ? callerId : receiverId,
      from: user._id,
      seconds: totalSeconds,
      reason: !verdict ? 'missed' : 'outgoing',
      type: callWithVideo ? 'video' : 'audio',
    };

    chatSocket.emit(ChatEvents.CALL_END, messageBody);
    cleanup();
  };

  useEffect(() => {
    if (connectionStatus === 'stop') {
      socketListener.current.removeAll();
      return;
    }
    const onOffer = function (data: CallOfferEventData) {
      setReceivingCall(true);

      setCallerId(data.from);
      setCallerName(data.name);
      setCallWithVideo(data.isVideoCall);
      setCallerSignal(data.signal);

      setOpen(true);
    };

    const onAnswer = function (data: CallAnswerEventData) {
      setVerdict(data.verdict);
      if (data.verdict === 'accept') {
        connectionRef.current?.signal(data.signal);
        startTimer();
        updateCallStatus({ isAudioEnabled: true, isVideoEnabled: callWithVideo });
        return;
      }
      cleanup();
    };

    const onEnd = function () {
      cleanup();
    };

    const onUpdate = function (data: CallUpdateEventData) {
      const { isAudioEnabled, isVideoEnabled } = data;
      setIsRemoteAudioEnabled(isAudioEnabled);
      setIsRemoteVideoEnabled(isVideoEnabled);
    };

    socketListener.current.set(ChatEvents.CALL_OFFER, onOffer);
    socketListener.current.set(ChatEvents.CALL_ANSWER, onAnswer);
    socketListener.current.set(ChatEvents.CALL_UPDATE, onUpdate);
    socketListener.current.set(ChatEvents.CALL_END, onEnd);

    socketListener.current.listenAll();

    return () => {
      socketListener.current.removeAll();
    };
  }, [connectionStatus]);

  const needToAnswer = !verdict && receivingCall && user._id !== callerId;
  const conversationIsStarted = verdict === 'accept';

  return (
    <>
      <CallsContext.Provider value={{ callUser, callAnswer, callEnd }}>
        {children}
        {createPortal(
          <CallModal open={open}>
            {needToAnswer ? (
              <AnswerOnCall answer={callAnswer} callFrom={callerName} withVideo={callWithVideo} />
            ) : (
              <div className='relative h-[500px] min-w-[20rem] rounded-md bg-white p-5 dark:bg-aside-bg'>
                {receiverName && !conversationIsStarted ? (
                  <div className='absolute left-5 top-10 z-[1001]'>
                    <p>звоним...</p>
                    <h5 className='text-sm font-normal'>{receiverName}</h5>
                  </div>
                ) : null}
                {conversationIsStarted ? (
                  <div className='absolute left-5 top-7 z-[1001]'>
                    <p>Разговор с...</p>
                    <h5 className='mt-2 text-sm '>{receiverName}</h5>
                    <p className='text-xs'>
                      <span>{('0' + minutes).slice(-2)} </span>
                      {' : '}
                      <span>{('0' + seconds).slice(-2)}</span>
                      {' min'}
                    </p>
                  </div>
                ) : null}
                <video
                  className={twMerge(
                    'absolute right-5 top-5 z-[1001] w-24',
                    isLocalVideoEnabled ? 'visible' : 'invisible',
                  )}
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted></video>
                <video
                  className={twMerge(
                    'absolute bottom-0 top-0 z-[1000] h-full w-[calc(100%-40px)]',
                    isRemoteVideoEnabled ? 'visible' : 'invisible',
                  )}
                  ref={remoteVideoRef}
                  autoPlay
                  muted={!isRemoteAudioEnabled}
                  playsInline></video>
                <div className='absolute bottom-5 z-[1001] flex w-[calc(100%-40px)] justify-center gap-x-4'>
                  <button onClick={toggleActiveMicrophone}>
                    <IconWrapper className='h-12 w-12'>
                      {isMicrophoneActive ? <MicOffOutlinedIcon /> : <KeyboardVoiceOutlinedIcon />}
                    </IconWrapper>
                  </button>
                  <button onClick={toggleActiveVideoCamera}>
                    <IconWrapper className='h-12 w-12'>
                      {isLocalVideoEnabled ? <VideocamOutlinedIcon /> : <VideocamOffOutlinedIcon />}
                    </IconWrapper>
                  </button>
                  <button onClick={callEnd}>
                    <IconWrapper className='h-12 w-12 bg-rose-500'>
                      <CallEndOutlinedIcon className='!text-white' />
                    </IconWrapper>
                  </button>
                </div>
              </div>
            )}
          </CallModal>,
          document.body,
        )}
      </CallsContext.Provider>
    </>
  );
};
