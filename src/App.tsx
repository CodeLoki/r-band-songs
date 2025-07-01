import { ErrorBoundary } from '@/components/ErrorBoundary';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { router } from '@router/index';
import { theme } from '@theme/index';
import { RouterProvider } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ErrorBoundary>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
