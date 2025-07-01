import { useBand } from '@/context';
import { useSongs } from '@/hooks';
import { LibraryMusic, PlayArrow } from '@mui/icons-material';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    IconButton,
    Typography
} from '@mui/material';
import { useEffect } from 'react';

export default function SongsPage() {
    const { currentBand } = useBand();
    const { songs, loading, error, loadSongsByBand, getYouTubeUrl } = useSongs();

    // Update document title with band name
    useEffect(() => {
        document.title = `Songs | ${currentBand?.description || 'Band Songs'}`;
    }, [currentBand]);

    // Load songs for current band
    useEffect(() => {
        if (currentBand?.id) {
            void loadSongsByBand(currentBand.id);
        }
    }, [currentBand?.id, loadSongsByBand]);

    const handlePlaySong = (videoId: string) => {
        const url = getYouTubeUrl(videoId);
        if (url) {
            window.open(url, '_blank');
        }
    };

    if (loading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 4 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Songs ({songs.length})
                </Typography>

                {songs.length === 0 ? (
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <LibraryMusic sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            No songs found for this band
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Songs will appear here once they are added to the band's repertoire.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            mt: 2,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: 3
                        }}
                    >
                        {songs.map(song => (
                            <Card
                                key={song.id}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        boxShadow: 4
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            mb: 1
                                        }}
                                    >
                                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                            {song.title}
                                        </Typography>
                                        {song.ytMusic && (
                                            <IconButton
                                                size="small"
                                                onClick={() => handlePlaySong(song.ytMusic!)}
                                                sx={{ color: 'primary.main' }}
                                            >
                                                <PlayArrow />
                                            </IconButton>
                                        )}
                                    </Box>

                                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                        {song.artist}
                                    </Typography>

                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                        {song.practice && (
                                            <Chip
                                                label="Practice"
                                                size="small"
                                                color="warning"
                                                sx={{ fontSize: '0.75rem' }}
                                            />
                                        )}
                                        {song.groove && (
                                            <Chip
                                                label="Groove"
                                                size="small"
                                                color="info"
                                                sx={{ fontSize: '0.75rem' }}
                                                onClick={() => window.open(song.groove, '_blank')}
                                                clickable
                                            />
                                        )}
                                    </Box>

                                    {song.notes && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mt: 2,
                                                fontStyle: 'italic',
                                                backgroundColor: 'action.hover',
                                                p: 1,
                                                borderRadius: 1
                                            }}
                                        >
                                            {song.notes}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Container>
    );
}
