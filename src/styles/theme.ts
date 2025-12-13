export const theme = {
  colors: {
    primary: '#4a90e2',
    primaryDark: '#357abd',
    secondary: '#50c878',
    background: '#f5f7fa',
    surface: '#ffffff',
    text: '#2c3e50',
    textLight: '#7f8c8d',
    border: '#e1e8ed',
    error: '#e74c3c',
    success: '#27ae60',
    warning: '#f39c12',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
};

export type Theme = typeof theme;

