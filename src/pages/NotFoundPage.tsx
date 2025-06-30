import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    The page you're looking for doesn't exist.
                </Typography>
                <Button variant="contained" onClick={() => void navigate('/')}>
                    Go Home
                </Button>
            </Box>
        </Container>
    );
}
