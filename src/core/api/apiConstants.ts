
export const apiConfig = {
    headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
};

export async function setHeaders(headers: Headers) {
    headers.set('authorization', `Api-Key o9OIUQqx.uRhNAonmiKd1nBModQQ8JX6b3L3S8jon`);
    return headers;
}

export const apiPaths = {
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    allNewsUrl: '/news/',
    newsLimitUrl: '/news/latest/',
    allGalleryUrl: '/gallery/featuredlist/',
    allPackagesUrl: '/packages/',
    bookingUrl: '/bookings/'
};