import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => ({
                url: '/notes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (res, err, arg) => {
                if (res?.ids) {
                    return [
                        { type: 'Note', id: 'LIST' },
                        ...res.ids.map(id => ({ type: 'Note', id}))
                    ]
                } else return [{ type: 'Note', id: 'LIST'}]
            }
        }),
        addNewNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: "LIST" }
            ]
        }),
        updateNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialNote,
                }
            }),
            invalidatesTags: (res, err, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
        deleteNode: builder.mutation({
            query: ({ id }) => ({
                url: '/notes',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (res, err, arg) => [
                { type: 'Note', id: arg.id }
            ]
        })
    }),
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNodeMutation
} = notesApiSlice

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)