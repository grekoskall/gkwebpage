import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const namesAdapter = createEntityAdapter({})

const initialState = namesAdapter.getInitialState()

export const namesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNames: builder.query({
            query: () => ({
                url: '/names',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedNames = responseData.map(name => {
                    name.id = name._id
                    return name
                })
                return namesAdapter.setAll(initialState, loadedNames)
            },
            providesTags: (res, err, arg) => {
                if (res?.ids) {
                    return [
                        { type: 'Name', id: 'LIST' },
                        ...res.ids.map(id => ({ type: 'Name', id}))
                    ]
                } else return [{ type: 'Name', id: 'LIST'}]
            }
        }),
        addNewName: builder.mutation({
            query: initialNameData => ({
                url: '/names',
                method: 'POST',
                body: {
                    ...initialNameData,
                }
            }),
            invalidatesTags: [
                { type: 'Name', id: 'LIST' }
            ]
        }),
        updateName: builder.mutation({
            query: initialNameData => ({
                url: '/names',
                method: 'PATCH',
                body: {
                    ...initialNameData,
                }
            }),
            invalidatesTags: (res, err, arg) => [
                { type: 'Name', id: arg.id }
            ]
        }),
        deleteName: builder.mutation({
            query: ({ id }) => ({
                url: '/names',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (res, err, arg) => [
                { type: 'Name', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetNamesQuery,
    useAddNewNameMutation,
    useUpdateNameMutation,
    useDeleteNameMutation
} = namesApiSlice

export const selectNamesResult = namesApiSlice.endpoints.getNames.select()

const selectNamesData = createSelector(
    selectNamesResult,
    namesResult => namesResult.data
)

export const {
    selectAll: selectAllNames,
    selectById: selectNameById,
    selectIds: selectNameIds
} = namesAdapter.getSelectors(state => selectNamesData(state) ?? initialState)