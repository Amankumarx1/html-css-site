tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#10B981',
          sky: '#38BDF8',
          amber: '#F59E0B',
          purple: '#A855F7',
          pink: '#EC4899',
          rose: '#F43F5E'
        },
        obsidian: {
          950: '#060709',
          900: '#0B0B0D',
          850: '#0E1014',
          800: '#111317',
          750: '#15181F',
          700: '#171A21',
          600: '#20242E'
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    }
  }
};
