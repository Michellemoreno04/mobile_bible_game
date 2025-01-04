module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      // esto se insto para react-native-paper
      env: {
        production: {
          plugins: ['react-native-paper/babel'],
        },
      },
    };
  };