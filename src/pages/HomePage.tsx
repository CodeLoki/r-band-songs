import { GigService } from '@/services';
import type { Gig } from '@/types';
import { Alert, Box, Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import type { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
    const location = useLocation();
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get URL parameters
    const params = new URLSearchParams(location.search);
    const currentBandId = params.get('b') || 'qRphnEOTg8GeDc0dQa4K';
    const currentUserId = params.get('u') || '';

    // Fetch gigs for the current band
    useEffect(() => {
        const fetchGigs = async () => {
            try {
                setLoading(true);
                setError(null);
                const bandGigs = await GigService.getGigsByBand(currentBandId);
                setGigs(bandGigs);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load gigs');
                console.error('Error loading gigs:', err);
            } finally {
                setLoading(false);
            }
        };

        void fetchGigs();
    }, [currentBandId]);

    // Helper function to format date
    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'No date';
        const date = timestamp.toDate();
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Container maxWidth="lg">
            {/* Gigs Section */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Gigs
                </Typography>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {!loading && !error && gigs.length === 0 && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        No gigs found for this band.
                    </Alert>
                )}

                {!loading && !error && gigs.length > 0 && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 3
                        }}
                    >
                        {gigs.map(gig => (
                            <Card key={gig.id} sx={{ height: '100%' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5" gutterBottom>
                                        {formatDate(gig.date)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {gig.venue}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
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
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}
