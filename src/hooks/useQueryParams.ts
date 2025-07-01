import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Custom hook for reading and updating URL query parameters
 * Provides utilities for managing URL state across the application
 */
export const useQueryParams = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Parse current URL search params
    const searchParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);

    // Get a specific query parameter value
    const getParam = useCallback(
        (key: string): string | null => {
            return searchParams.get(key);
        },
        [searchParams]
    );

    // Get band ID from 'b' parameter with default fallback
    const getBandId = useCallback((): string => {
        return searchParams.get('b') || 'qRphnEOTg8GeDc0dQa4K';
    }, [searchParams]);

    // Get user ID from 'u' parameter with default fallback
    const getUserId = useCallback((): string => {
        return searchParams.get('u') || '';
    }, [searchParams]);

    // Set a query parameter and update the URL
    const setParam = useCallback(
        (key: string, value: string | null) => {
            const newSearchParams = new URLSearchParams(searchParams);

            if (value === null || value === '') {
                newSearchParams.delete(key);
            } else {
                newSearchParams.set(key, value);
            }

            const newSearch = newSearchParams.toString();
            const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;

            void navigate(newUrl, { replace: true });
        },
        [searchParams, location.pathname, navigate]
    );

    // Set band ID in the 'b' parameter
    const setBandId = useCallback(
        (bandId: string | null) => {
            setParam('b', bandId);
        },
        [setParam]
    );

    // Set user ID in the 'u' parameter
    const setUserId = useCallback(
        (userId: string | null) => {
            setParam('u', userId);
        },
        [setParam]
    );

    // Set multiple parameters at once
    const setParams = useCallback(
        (params: Record<string, string | null>) => {
            const newSearchParams = new URLSearchParams(searchParams);

            Object.entries(params).forEach(([key, value]) => {
                if (value === null || value === '') {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, value);
                }
            });

            const newSearch = newSearchParams.toString();
            const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;

            void navigate(newUrl, { replace: true });
        },
        [searchParams, location.pathname, navigate]
    );

    // Get all parameters as an object
    const getAllParams = useCallback((): Record<string, string> => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }, [searchParams]);

    return {
        // Generic parameter methods
        getParam,
        setParam,
        setParams,
        getAllParams,

        // Specific methods for band and user context
        getBandId,
        setBandId,
        getUserId,
        setUserId,

        // Raw search params for advanced usage
        searchParams: searchParams
    };
};
