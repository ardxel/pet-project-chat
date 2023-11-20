import { useCallback, useRef, useState } from 'react';
import { SignalData } from 'simple-peer';

export const useCallState = () => {
  /**
   * Отвечает за open пропс в Dialog
   */
  const [open, setOpen] = useState(false);
  /**
   * Вердикт выносится при ответе пользователя на звонок от другого пользователя.
   */
  const [verdict, setVerdict] = useState<'accept' | 'cancel' | null>(null);
  /**
   * Для делегирования входящего вызова
   */
  const [receivingCall, setReceivingCall] = useState(false);

  const [callWithVideo, setCallWithVideo] = useState(false);

  const resetCallState = useCallback(() => {
    setOpen(false);
    setVerdict(null);
    setReceivingCall(false);
    setCallWithVideo(false);
  }, []);

  return {
    open,
    setOpen,
    verdict,
    setVerdict,
    receivingCall,
    setReceivingCall,
    callWithVideo,
    setCallWithVideo,
    resetCallState,
  };
};

export const useCallerState = () => {
  const [callerIsMe, setCallerIsMe] = useState(false);
  const [callerId, setCallerId] = useState<string>(null);
  const [callerName, setCallerName] = useState<string>(null);
  const [callerSignal, setCallerSignal] = useState<SignalData>();

  const resetCallerState = useCallback(() => {
    setCallerIsMe(false);
    setCallerName(undefined);
    setCallerId(undefined);
    setCallerSignal(undefined);
  }, []);

  return {
    callerIsMe,
    setCallerIsMe,
    callerId,
    setCallerId,
    callerName,
    setCallerName,
    callerSignal,
    setCallerSignal,
    resetCallerState,
  };
};

export const useReceiverState = () => {
  const [receiverIsMe, setReceiverIsMe] = useState(false);
  const [receiverName, setReceiverName] = useState<string>();
  const [receiverId, setRecieverId] = useState<string>();

  const resetReceiverState = useCallback(() => {
    setReceiverIsMe(false);
    setReceiverName(undefined);
    setRecieverId(undefined);
  }, []);

  return {
    receiverIsMe,
    setReceiverIsMe,
    receiverName,
    setReceiverName,
    receiverId,
    setRecieverId,
    resetReceiverState,
  };
};

export const useRemoteMediaState = () => {
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [isRemoteAudioEnabled, setIsRemoteAudioEnabled] = useState(false);
  const [isRemoteVideoEnabled, setIsRemoteVideoEnabled] = useState(false);
  const remoteVideoRef = useRef<HTMLVideoElement>();

  const resetRemoteMediaState = useCallback(() => {
    setRemoteStream(undefined);
    setIsRemoteAudioEnabled(false);
    setIsRemoteVideoEnabled(undefined);
    remoteVideoRef.current = null;
  }, []);

  return {
    remoteStream,
    setRemoteStream,
    isRemoteAudioEnabled,
    setIsRemoteAudioEnabled,
    isRemoteVideoEnabled,
    setIsRemoteVideoEnabled,
    resetRemoteMediaState,
    remoteVideoRef,
  };
};

export const useLocalMediaState = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [isLocalVideoEnabled, setIsLocalVideoEnabled] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>();

  const resetLocalMediaState = useCallback(() => {
    setIsMicrophoneActive(false);
    setIsLocalVideoEnabled(false);
    setLocalStream(undefined);
    localVideoRef.current = null;
  }, []);

  return {
    isMicrophoneActive,
    setIsMicrophoneActive,
    setIsLocalVideoEnabled,
    localStream,
    setLocalStream,
    isLocalVideoEnabled,
    localVideoRef,
    resetLocalMediaState,
  };
};
