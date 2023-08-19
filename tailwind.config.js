module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          customGray: 'rgb(204, 204, 204)',
        },
        screens: {
          'sm': '375px',
          'md': '768px',
          'lg': '992px',
          'xl': '1200px',
        },
      },
    },
  };
