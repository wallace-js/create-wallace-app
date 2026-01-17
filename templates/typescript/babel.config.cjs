module.exports = {
  plugins: [
    [
      "babel-plugin-wallace",
      {
        flags: {
          useControllers: true,
          useMethods: true,
          useStubs: true,
        },
      },
    ],
    "@babel/plugin-syntax-jsx",
  ],
  presets: ["@babel/preset-typescript"],
};
