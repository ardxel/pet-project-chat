const config = {
  apiUrl: process.env.API_URL,
  apiToken: process.env.API_TOKEN,
  isDev: process.env.NODE_ENV === 'development',
};

export default config;
