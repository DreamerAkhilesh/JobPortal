module.exports = {
    content: [
      './index.html', // Include your index.html file
      './src/**/*.{js,ts,jsx,tsx}', // Include all React components
    ],
    theme: {
      extend: {
        // Custom styles can go here
        colors: {
          primary: '#1d4ed8', // Example: Adding a primary color
          secondary: '#9333ea', // Example: Adding a secondary color
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // For styling forms
      require('@tailwindcss/typography'), // For typography utilities
      // Add more plugins if needed
    ],
  };
  