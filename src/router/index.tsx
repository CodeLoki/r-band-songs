import { AppWrapper } from '@/components/AppWrapper';
import { MainLayout } from '@components/index';
import { GigsPage, HomePage, NotFoundPage, SongsPage } from '@pages/index';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppWrapper />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />
                    },
                    {
                        path: 'songs',
                        element: <SongsPage />
                    },
                    {
                        path: 'gigs',
                        element: <GigsPage />
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);
