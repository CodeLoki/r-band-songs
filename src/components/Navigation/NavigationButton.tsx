import type { SvgIconTypeMap } from '@mui/material';
import { Button } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';

interface NavigationButtonProps {
    label: string;
    path: string;
    icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };
    isActive: boolean;
    onClick: () => void;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
    label,
    icon: IconComponent,
    isActive,
    onClick
}) => {
    // Enhanced CSS-in-JS styles for navigation buttons
    const navButtonStyles = {
        inactive: {
            backgroundColor: 'transparent',
            color: 'rgba(255,255,255,0.85)',
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.12)',
                color: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            },
            fontWeight: 500,
            borderBottom: '2px solid transparent',
            borderRadius: '8px',
            textTransform: 'none',
            px: 2,
            py: 1,
            transition: 'all 0.2s ease-in-out',
            minWidth: '80px'
        },
        active: {
            backgroundColor: 'rgba(255,255,255,0.25)',
            color: 'white',
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.35)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            },
            fontWeight: 700,
            borderBottom: '3px solid rgba(255,255,255,0.9)',
            borderRadius: '8px 8px 0 0',
            textTransform: 'none',
            px: 2,
            py: 1,
            transition: 'all 0.2s ease-in-out',
            minWidth: '80px',
            position: 'relative',
            '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-3px',
                left: '50%',
                width: '60%',
                height: '2px',
                backgroundColor: 'rgba(255,255,255,0.4)',
                borderRadius: '2px',
                transform: 'translateX(-50%)'
            }
        }
    };

    return (
        <Button
            color="inherit"
            onClick={onClick}
            startIcon={<IconComponent />}
            sx={isActive ? navButtonStyles.active : navButtonStyles.inactive}
        >
            {label}
        </Button>
    );
};
