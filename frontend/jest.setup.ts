import '@testing-library/jest-dom';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import React from 'react';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.React = React;

export default {
  transform: {},
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
