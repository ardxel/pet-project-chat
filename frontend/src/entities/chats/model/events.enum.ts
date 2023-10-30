export enum ChatEvents {
  USER_INIT = 'user:init',
  CONVERSATION_CREATE = 'conversation:create',
  CONVERSATION_FETCH = 'conversation:fetch',
  MESSAGE_CREATE = 'message:create',
  MESSAGE_FETCH = 'message:fetch',
}

export enum ChatClientErrorEvents {
  CONVERSATION_CREATE = 'error:conversation-create',
  MESSAGE_CREATE = 'error:message-create',
  MESSAGE_FETCH = 'error:message-fetch',
  INVALID_TOKEN = 'error:invalid-token',
}
