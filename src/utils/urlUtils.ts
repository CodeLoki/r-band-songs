/**
 * Utility functions for URL construction and navigation
 */

/**
 * Build a URL with query parameters
 * @param path - The base path
 * @param params - Query parameters as key-value pairs
 * @returns Complete URL with query string
 */
export const buildUrlWithParams = (path: string, params: Record<string, string | null | undefined>): string => {
    const searchParams = new URLSearchParams();

    // Add non-null/undefined parameters
    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            searchParams.set(key, value);
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
};

/**
 * Build a URL preserving existing query parameters and adding/overriding new ones
 * @param path - The base path
 * @param currentSearch - Current URL search string (from location.search)
 * @param newParams - New parameters to add or override
 * @returns Complete URL with merged query parameters
 */
export const buildUrlWithMergedParams = (
    path: string,
    currentSearch: string,
    newParams: Record<string, string | null | undefined> = {}
): string => {
    const searchParams = new URLSearchParams(currentSearch);

    // Add or override with new parameters
    Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
};

/**
 * Get query parameters from a URL search string
 * @param search - URL search string (from location.search)
 * @returns Object with query parameters
 */
export const getParamsFromSearch = (search: string): Record<string, string> => {
    const params: Record<string, string> = {};
    const searchParams = new URLSearchParams(search);

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
};

/**
 * Build app-specific URLs with band and user context
 * @param path - The base path
 * @param bandId - Band ID for the 'b' parameter
 * @param userId - User ID for the 'u' parameter (optional)
 * @param additionalParams - Additional query parameters
 * @returns Complete URL with band/user context
 */
export const buildAppUrl = (
    path: string,
    bandId?: string | null,
    userId?: string | null,
    additionalParams: Record<string, string | null | undefined> = {}
): string => {
    const params: Record<string, string | null | undefined> = {
        ...additionalParams
    };

    if (bandId) {
        params.b = bandId;
    }

    if (userId) {
        params.u = userId;
    }

    return buildUrlWithParams(path, params);
};
