import { useBand } from '@/context';
import { buildUrlWithMergedParams } from '@/utils';
import { Event, LibraryMusic } from '@mui/icons-material';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavigationButton } from '../Navigation';

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentBand, loading } = useBand();

    const navigationItems = [
        { label: 'Gigs', path: '/', icon: Event },
        { label: 'Songs', path: '/songs', icon: LibraryMusic }
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
                            <NavigationButton
                                key={item.path}
                                label={item.label}
                                path={item.path}
                                icon={item.icon}
                                isActive={location.pathname === item.path}
                                onClick={() => navigateWithParams(item.path)}
                            />
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
