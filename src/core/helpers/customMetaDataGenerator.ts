import { Metadata } from 'next';

interface PageSEOProps {
    title: string;
    description?: string;
    canonicalUrl?: string;
    ogType?: "website" | "article" | "music.album" | "music.playlist" | "video.other";
    ogImage?: string;
    twitterCard?: "summary_large_image" | "summary" | "player" | "app";
    keywords?: string[];
}

export function customMetaDataGenerator({
    title,
    description = "Altitude Air offers top-rated helicopter services and scenic package tours to beautiful destinations.",
    canonicalUrl = 'https://altitudeairnepal.com',
    ogType = 'website',
    keywords = [
        "an array", "of default", "keywords"
    ],
    ogImage = 'https://altitudeairnepal.com/images/banner/banner-4.jpg',
    twitterCard = 'summary_large_image',
}: PageSEOProps): Metadata {

    const siteTitle = 'Altitude Air Nepal';
    const fullTitle = `${title} | ${siteTitle}`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        openGraph: {
            title: fullTitle,
            description,
            type: ogType,
            url: canonicalUrl,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: twitterCard,
            title: fullTitle,
            description,
            images: [ogImage],
        },
        alternates: {
            canonical: canonicalUrl,
        },
    };
}
