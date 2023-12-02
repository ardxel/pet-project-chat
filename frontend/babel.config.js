const plugins = [
  [
    'babel-plugin-direct-import',
    {
      modules: ['@mui/system', '@mui/material', '@mui/icons-material'],
    },
  ],
];
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins,
};
