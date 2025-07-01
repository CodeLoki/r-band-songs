import { useBand } from '@/context';
import { buildUrlWithMergedParams } from '@/utils';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentBand, loading } = useBand();

    const navigationItems = [
        { label: 'Gigs', path: '/' },
        { label: 'Songs', path: '/songs' }
    ];

    const navigateWithParams = (path: string) => {
        const urlWithParams = buildUrlWithMergedParams(path, location.search);
        void navigate(urlWithParams);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {loading ? 'Band Songs' : currentBand ? currentBand.description : 'Band Songs'}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {navigationItems.map(item => (
                            <Button
                                key={item.path}
                                color="inherit"
                                onClick={() => navigateWithParams(item.path)}
                                sx={{
                                    backgroundColor:
                                        location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent'
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
