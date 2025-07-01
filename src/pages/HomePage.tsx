import { useBand } from '@/context';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
    const { currentBand } = useBand();
    const location = useLocation();

    // Get URL parameters
    const params = new URLSearchParams(location.search);
    const currentBandId = params.get('b') || 'qRphnEOTg8GeDc0dQa4K';
    const currentUserId = params.get('u') || '';

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Band Songs
                </Typography>
                <Typography variant="h6" component="p" gutterBottom color="text.secondary">
                    Welcome to Band Songs - Your music organization companion
                </Typography>

                {/* Current Band and User Info */}
                <Box sx={{ mt: 2, mb: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Current Context
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Band ID: {currentBandId}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                User ID: {currentUserId || '(not set)'}
                            </Typography>
                            {currentBand && (
                                <Typography variant="body1" gutterBottom>
                                    Current Band: {currentBand.description}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}
