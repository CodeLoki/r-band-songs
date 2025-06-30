import { Box, Container, Typography } from '@mui/material';

export default function GigsPage() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Gigs
                </Typography>
                <Typography variant="h6" component="p" gutterBottom color="text.secondary">
                    Plan and organize your upcoming performances
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1">Gig management functionality will be implemented here.</Typography>
                </Box>
            </Box>
        </Container>
    );
}
