module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nesting": {}, // Use the standalone postcss-nesting plugin
    tailwindcss: {
      config: "./tailwind.config.js",
    },
    autoprefixer: {},
  },
};
