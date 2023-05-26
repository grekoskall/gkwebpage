import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://gkpage-ts.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // Status Codes Handler
    if (result?.error?.status === 403) {
        console.log('Refresh Token Issue')
        const refreshToken = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshToken?.data) {
            // Set new token
            api.dispatch(setCredentials({ ...refreshToken.data }))

            // Retry Query with new Access Token
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshToken?.error?.status === 403) {
                refreshToken.error.data.message = "Expired login."
            }
            return refreshToken
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryReauth,
    tagTypes: ['Note', 'Name'],
    endpoints: builder => ({})
})