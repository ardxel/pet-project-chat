import { SignalData } from 'simple-peer';

interface CallEventData {
  to: string;
  from?: string;
}

export interface CallOfferEventData extends CallEventData {
  signal: SignalData;
  name: string;
  isVideoCall: boolean;
}

export interface CallAnswerEventData extends CallEventData {
  verdict: 'accept' | 'cancel';
  signal: SignalData;
}

export interface CallEndEventData extends CallEventData {}

export interface CallUpdateEventData extends CallEventData {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}
