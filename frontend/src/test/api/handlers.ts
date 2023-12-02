import { rest } from 'msw';
import { config } from 'shared/api';
import { successDataResponse, userStub } from 'test/stubs';

let token = 'access_token';

export const handlers = [
  rest.post(`${config.apiUrl}/auth/sign-in`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(successDataResponse({ user: userStub(), token })));
  }),
];
