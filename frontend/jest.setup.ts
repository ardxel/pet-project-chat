import '@testing-library/jest-dom';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import React from 'react';
import { TextDecoder, TextEncoder } from 'util';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.React = React;
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

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
