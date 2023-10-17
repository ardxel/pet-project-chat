const config = {
  apiUrl: process.env.API_URL,
  apiToken: process.env.API_KEY,
  isDev: process.env.NODE_ENV === 'development',
};

export default config;
