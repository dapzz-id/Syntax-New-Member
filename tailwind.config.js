/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './resources/**/*.blade.php',
      './resources/**/*.js',
      './resources/**/*.jsx',
      './resources/**/*.ts',
      './resources/**/*.tsx',
    ],
    theme: {
      extend: {
        height: {
          'screen/2': '50vh',
          'dvh/2': 'calc((100dvh / 1.2))',
          'H+32': 'calc(100dvh / 2.4)',
          'H+64': 'calc(100dvh - 40dvh)',
        },
        width: {
          'full/2': 'calc(100% / 2)',
        },
        animation: {
          fadeIn: 'fadeIn 2s ease-in forwards',
          bounce: 'bounce 1.8s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          bounce: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
    ],
}  