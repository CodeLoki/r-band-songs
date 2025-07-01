import { useBand } from '@/context';
import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react';

export default function SongsPage() {
    const { currentBand } = useBand();

    // Update document title with band name
    useEffect(() => {
        document.title = `${currentBand?.description || 'Band Songs'} | Songs`;
    }, [currentBand]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Songs
                </Typography>
                <Typography variant="h6" component="p" gutterBottom color="text.secondary">
                    Manage your band's song library
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1">Song management functionality will be implemented here.</Typography>
                </Box>
            </Box>
        </Container>
    );
}
