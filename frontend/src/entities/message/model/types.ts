export type CallEndReason = 'outgoing' | 'missed';

export type ParsedCallText = {
  reason: CallEndReason;
  type: MessageType;
  seconds: number;
};

export type MessageType = 'text' | 'audio' | 'video' | 'call';

export interface IMessage {
  conversationId: string;
  sender: string;
  _id: string;
  text: string;
  type: MessageType;
  updatedAt: string;
  createdAt: string;
}
