import { Alert, Box, Typography } from '@mui/material';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 3 }}>
                    <Alert severity="error">
                        <Typography variant="h6">Something went wrong</Typography>
                        <Typography variant="body2">
                            {this.state.error?.message || 'An unknown error occurred'}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace', fontSize: '0.8rem' }}>
                            {this.state.error?.stack}
                        </Typography>
                    </Alert>
                </Box>
            );
        }

        return this.props.children;
    }
}
