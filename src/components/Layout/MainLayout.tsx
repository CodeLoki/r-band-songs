import { useBand } from '@/context';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentBand, loading } = useBand();

    const navigationItems = [
        { label: 'Home', path: '/' },
        { label: 'Songs', path: '/songs' },
        { label: 'Gigs', path: '/gigs' }
    ];

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
                                onClick={() => void navigate(item.path)}
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
