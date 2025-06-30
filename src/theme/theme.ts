import { createTheme } from '@mui/material/styles';

// Create a custom theme for the band songs app
export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2', // Blue color suitable for music apps
            light: '#42a5f5',
            dark: '#1565c0'
        },
        secondary: {
            main: '#dc004e', // Red/pink accent color
            light: '#ff5983',
            dark: '#9a0036'
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff'
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
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
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }
            }
        }
    }
});

// Dark theme variant for later use
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            light: '#e3f2fd',
            dark: '#42a5f5'
        },
        secondary: {
            main: '#f48fb1',
            light: '#fce4ec',
            dark: '#f06292'
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e'
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
    },
    shape: {
        borderRadius: 8
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
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
        }
    }
});
