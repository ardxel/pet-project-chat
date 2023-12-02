let testApiUrl = 'http://localhost:3111';

const config = {
  apiUrl: process.env.API_URL || testApiUrl,
  apiToken: process.env.API_KEY,
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  socketUrl: process.env.SOCKET_URL,
};

export default config;
