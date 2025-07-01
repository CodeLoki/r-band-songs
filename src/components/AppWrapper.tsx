import { BandProvider } from '@/context';
import React, { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AppWrapperProps {
    children?: ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = () => {
    return (
        <BandProvider>
            <Outlet />
        </BandProvider>
    );
};
