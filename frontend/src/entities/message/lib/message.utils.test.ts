import { messageStub } from 'test';
import { messageUtils } from './message.utils';

describe('Test messageUtils', () => {
  test('test getLastUpdatedTime', () => {
    const message = messageStub();
    expect(messageUtils.getLastUpdatedTime(message)).toBe(message.updatedAt);
  });

  test('test showUpdatedTime', () => {
    const messageAsNotEdited = messageStub();
    const messageAsEdited = messageStub();
    messageAsEdited.updatedAt = new Date().toString();

    expect(messageUtils.showUpdatedTime(messageAsNotEdited)).toBeFalsy();
    expect(messageUtils.showUpdatedTime(messageAsEdited)).toBeTruthy();
  });

  test('test getType', () => {
    const message = messageStub();

    expect(messageUtils.getType(message)).toBe(message.type);
  });

  test('test parseCallText', () => {
    const textMessage = messageStub();
    const callMessage = messageStub();
    callMessage.type = 'call';
    callMessage.text = 'outgoing.text.10';

    expect(messageUtils.parseCallText(callMessage)).toEqual({ reason: 'outgoing', type: 'text', seconds: 10 });
    expect(messageUtils.parseCallText(textMessage)).toBeUndefined();
  });
});
