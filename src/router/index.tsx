import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components';
import { GigsPage, HomePage, NotFoundPage, SongsPage } from '../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
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
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);
