import { createTheme } from '@mui/material/styles';

// Create a custom theme for the band songs app
export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Light blue for dark theme
            light: '#e3f2fd',
            dark: '#42a5f5'
        },
        secondary: {
            main: '#f48fb1', // Pink accent color for dark theme
            light: '#fce4ec',
            dark: '#f06292'
        },
        background: {
            default: '#121212', // Dark background
            paper: '#1e1e1e' // Slightly lighter dark for cards/paper
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)'
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500
        }
    },
    shape: {
        borderRadius: 8
    },
    spacing: 8,
    components: {
        // Customize MUI components globally
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Disable uppercase transformation
                    borderRadius: 8
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    backgroundColor: '#1e1e1e' // Darker app bar
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 8
                }
            }
        }
    }
});
