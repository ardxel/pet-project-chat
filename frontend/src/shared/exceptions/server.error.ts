export class ServerError extends Error {
  constructor(message = 'Ошибка сервера, повторите позднее') {
    super(message);
    this.name = 'ServerError';
  }
}
