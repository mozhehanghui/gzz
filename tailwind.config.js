module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // content: [
  //   './src/pages/**/*.js',
  //   './src/components/**.js',
  //   './src/layouts/**.js',
  // ],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
}
