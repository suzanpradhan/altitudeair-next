import { apiPaths } from "@/core/api/apiConstants";
import { baseApi } from "@/core/api/apiQuery";
import { PaginatedResponseType } from "@/core/types/responseTypes";
import { CrewsType } from "./crewType";

const crewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCrew: builder.query<
            PaginatedResponseType<CrewsType>,
            number
        >({
            query: (pageNumber) =>
                `${apiPaths.crewUrl}?page=${pageNumber}`,
            providesTags: (response) =>
                response?.results
                    ? [
                        ...response.results.map(
                            ({ id }) => ({ type: 'Crew', id }) as const
                        ),
                        { type: 'Crew', id: 'LIST' },
                    ]
                    : [{ type: 'Crew', id: 'LIST' }],
            serializeQueryArgs: ({ endpointName, queryArgs }) =>
                `${endpointName}(${queryArgs})`,

            async onQueryStarted(payload, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log(err);
                }
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
    }),
    overrideExisting: true,
});

export default crewApi;