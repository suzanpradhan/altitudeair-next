
export const apiConfig = {
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

export async function setHeaders(headers: Headers) {
    headers.set('authorization', `Api-Key cMhfWvLs.OnxdEp1sNEm4zajmLRm7uttbYJVXj2a1`);
    return headers;
}

export const apiPaths = {
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    allNewsUrl: '/news/',
    newsLimitUrl: '/news/latest/',
    allGalleryUrl: '/gallery/featuredlist/',
};