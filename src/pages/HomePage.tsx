import {
    Alert,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { BandService } from '../services';
import type { Band } from '../types';

export default function HomePage() {
    const [bands, setBands] = useState<Band[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBands = async () => {
            try {
                setLoading(true);
                setError(null);
                const bandsData = await BandService.getAllBands();
                setBands(bandsData);
            } catch (err) {
                console.error('Error loading bands:', err);
                setError(err instanceof Error ? err.message : 'Failed to load bands');
            } finally {
                setLoading(false);
            }
        };

        void loadBands();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Band Songs
                </Typography>
                <Typography variant="h6" component="p" gutterBottom color="text.secondary">
                    Welcome to Band Songs - Your music organization companion
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Firebase Connectivity Test
                            </Typography>

                            {loading && (
                                <Box display="flex" alignItems="center" gap={2}>
                                    <CircularProgress size={20} />
                                    <Typography>Loading bands from Firestore...</Typography>
                                </Box>
                            )}

                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    Error: {error}
                                </Alert>
                            )}

                            {!loading && !error && (
                                <>
                                    <Typography variant="body1" gutterBottom>
                                        Successfully connected to Firestore! Found {bands.length} band(s):
                                    </Typography>

                                    {bands.length > 0 ? (
                                        <List>
                                            {bands.map(band => (
                                                <ListItem key={band.id}>
                                                    <ListItemText
                                                        primary={band.description}
                                                        secondary={`ID: ${band.id}`}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No bands found. The connection is working, but the collection is empty.
                                        </Typography>
                                    )}
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Ready for Development
                            </Typography>
                            <Typography variant="body1">
                                Material-UI (MUI), React Router, and Firebase have been successfully configured!
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
