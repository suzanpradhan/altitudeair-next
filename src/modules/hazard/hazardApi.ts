import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { HazardFormType } from './hazardType';

const hazardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create booking
    postHazard: builder.mutation<any, HazardFormType>({
      query: (payload) => {
        const data = {
          ...payload,
          ...(payload.date
            ? { date: payload.date.toISOString().split('T')[0] }
            : { date: null }),
        };
        return {
          url: `${apiPaths.contactUsUrl}`,
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response: any) => {
        return response;
      },
      // invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export default hazardApi;
