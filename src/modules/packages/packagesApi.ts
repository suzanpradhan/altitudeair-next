import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PackagesDataType } from './packagesType';

const packagesApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Packages'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllPackages: builder.query<PackagesDataType[], void>({
                query: () => `${apiPaths.allPackagesUrl}`,
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
                    return response as PackagesDataType[];
                },
            }),
            getPackage: builder.query<PackagesDataType, number>({
                query: (arg) => `${apiPaths.allPackagesUrl}${arg}/`,
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
                    return response as PackagesDataType;
                },
            }),
        }),
        overrideExisting: true,
    });

export default packagesApi;