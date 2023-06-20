// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatError } from '../helpers';


const baseQuery = fetchBaseQuery({
    baseUrl: "https://bloom-safe-af07b9d4838b.herokuapp.com/api",
    prepareHeaders: async(headers, { getState }) => {
        const token = await AsyncStorage.getItem('token');
      // console.log(token)
      if (token) {
      // console.log(token, 'valid token')
  
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    }
  })
// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    uploadDocument: builder.mutation({
        query(data) {
          return {
            url: `/test`,
            method: "POST",
            body: data,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

        },
        transformErrorResponse: (response, meta, arg) => ({
            message: formatError(response),
            error: formatError(response),
          }),
      }),
      registerAccount: builder.mutation({
        query(data) {
          return {
            url: `/register`,
            method: "POST",
            body: data

          };

        },
        transformErrorResponse: (response, meta, arg) => ({
          message: formatError(response),
          error: formatError(response),
        }),
       
      }),
      loginAccount: builder.mutation({
        query(data) {
          return {
            url: `/login`,
            method: "POST",
            body: data

          };

        },
        transformErrorResponse: (response, meta, arg) => ({
          message: formatError(response),
          error: formatError(response),
        }),
       
      })
,
      updatePassword: builder.mutation({
        query(data) {
          return {
            url: `/password/change`,
            method: "PUT",
            body: data

          };

        },
        transformErrorResponse: (response, meta, arg) => ({
          message: formatError(response),
          error: formatError(response),
        }),
       
      })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useUploadDocumentMutation, useRegisterAccountMutation,
   useLoginAccountMutation,
   useUpdatePasswordMutation
  
  } = Api