import { Box, Card, CardContent, Container, Typography } from '@mui/material';

export default function HomePage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Home
                </Typography>
                <Typography variant="h6" component="p" gutterBottom color="text.secondary">
                    Welcome to Band Songs - Your music organization companion
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Getting Started
                            </Typography>
                            <Typography variant="body1">
                                Material-UI (MUI) and React Router have been successfully configured! The application is
                                now ready for further development.
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                                Features ready to implement:
                            </Typography>
                            <ul>
                                <li>Song management</li>
                                <li>Gig planning</li>
                                <li>Setlist organization</li>
                                <li>Band collaboration</li>
                            </ul>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}
