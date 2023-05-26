import NewNoteForm from './NewNoteForm'
import { useGetNamesQuery } from '../names/namesApiSlice'
import PacmanLoader from 'react-spinners/PacmanLoader'

const NewNote = () => {
    const { names } = useGetNamesQuery("namesList", {
        selectFromResult: ({ data }) => ({
            names: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!names?.length) {
        return <PacmanLoader color={"#FFF"} />
    }

    const content = <NewNoteForm names={names} />

    return content
}

export default NewNote