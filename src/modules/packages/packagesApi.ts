import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { PackageGalleryDataType, PackagesDataType } from './packagesType';

const packagesApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Packages'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllPackages: builder.query<PaginatedResponseType<PackagesDataType>, void>({
                query: () => `${apiPaths.allPackagesPublicUrl}`,
                providesTags: (response: any) =>
                    response
                        ? [
                            ...response?.data?.map(({ id }: { id: number }) => ({ type: 'Packages', id } as const)) ?? [],
                            { type: 'Packages', id: 'LIST' },
                        ]
                        : [{ type: 'Packages', id: 'LIST' }],
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    // console.log(response);
                    return response as PaginatedResponseType<PackagesDataType>;
                },
            }),
            // getPackagesLimit: builder.query<PackagesDataType[], number>({
            //     query: () => `${apiPaths.allPackagesUrl}`,
            //     providesTags: (response: any) =>
            //         response
            //             ? [
            //                 ...response?.data?.map(({ id }: { id: number }) => ({ type: 'Packages', id } as const)) ?? [],
            //                 { type: 'Packages', id: 'LIST' },
            //             ]
            //             : [{ type: 'Packages', id: 'LIST' }],
            //     serializeQueryArgs: ({ endpointName }) => {
            //         return endpointName;
            //     },
            //     forceRefetch({ currentArg, previousArg }) {
            //         return currentArg !== previousArg;
            //     },
            //     transformResponse: (response: any) => {
            //         // console.log(response);
            //         return response as PackagesDataType[];
            //     },
            // }),
            getPackage: builder.query<PackagesDataType, string>({
                query: (arg) => `${apiPaths.getPackages}${arg}/`,
                providesTags: (response: any) =>
                    response
                        ? [
                            ...response?.data?.map(({ id }: { id: number }) => ({ type: 'Packages', id } as const)) ?? [],
                            { type: 'Packages', id: 'LIST' },
                        ]
                        : [{ type: 'Packages', id: 'LIST' }],
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    // console.log(response);
                    return response as PackagesDataType;
                },
            }),
            getPackageLink: builder.query<PackagesDataType, string>({
                query: (arg) => `${apiPaths.getPackages}${arg}/`,
                providesTags: (response: any) =>
                    response
                        ? [
                            ...response?.data?.map(({ id }: { id: number }) => ({ type: 'Packages', id } as const)) ?? [],
                            { type: 'Packages', id: 'LIST' },
                        ]
                        : [{ type: 'Packages', id: 'LIST' }],
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    // console.log(response);
                    return response as PackagesDataType;
                },
            }),
            getPackageGallery: builder.query<PackageGalleryDataType[], string>({
                query: (arg) => `${apiPaths.getPackages}${arg}/gallery/`,
                providesTags: (response: any) =>
                    response
                        ? [
                            ...response?.data?.map(({ id }: { id: number }) => ({ type: 'Packages', id } as const)) ?? [],
                            { type: 'Packages', id: 'LIST' },
                        ]
                        : [{ type: 'Packages', id: 'LIST' }],
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    console.log(response);
                    return response as PackageGalleryDataType[];
                },
            }),
        }),
        overrideExisting: true,
    });

export default packagesApi;