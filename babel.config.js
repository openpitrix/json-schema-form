module.exports = {
  presets: ['@babel/env', '@babel/react'],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-export-default-from',
  ],
};
