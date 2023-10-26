const config = {
  apiUrl: process.env.API_URL,
  apiToken: process.env.API_KEY,
  isDev: process.env.NODE_ENV === 'development',
  socketUrl: process.env.SOCKET_URL,
};

export default config;
