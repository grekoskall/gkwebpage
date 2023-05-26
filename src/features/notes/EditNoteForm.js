import { useState, useEffect } from 'react'
import { useUpdateNoteMutation, useDeleteNodeMutation } from './notesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'

const EditNoteForm = ({note, names}) => {
    const {isAdmin, isVip} = useAuth()
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNodeMutation()

    const navigate = useNavigate()

    // Define States
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [nameId, setNameId] = useState(note.name)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setNameId('')
            navigate('/dashboard/notes')
        }
    }, [isSuccess, isDelSuccess, navigate])

    // Handlers
    const handleTitleChange = e => setTitle(e.target.value)
    const handleTextChange = e => setText(e.target.value)
    const handleNameIdChange = e => setNameId(e.target.value)

    const canSave = [title, text, nameId].every(Boolean) && !isLoading
    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({
                id: note.id,
                name: nameId, 
                title,
                text
            })
        }
    }
    const onDeleteNoteClicked = async () => {
        await deleteNote({
            id: note.id
        })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
    
    const options = names.map(name => {
        return (
            <option
                key={name.id}
                value={name.id}
            >
                {name.name}
            </option>
        )
    })

    // Validation Classes
    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "invalid" : ''
    const validTextClass = !text ? "invalid" : ''
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let deleteButton = null
    if (isAdmin || isVip) {
        deleteButton = (
            <button
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    // Content to return
    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <h2>Edit Note</h2>
                    <div>
                        <button
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                
                <label htmlFor="title">
                    Title:
                </label>
                <input
                    className={`${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={handleTitleChange}
                />

                <lable htmlFor="text">
                    Text:
                </lable>
                <textarea
                    className={`${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={handleTextChange}
                />

                <div>
                    <div>
                        <label htmlFor="name">
                            Assigned To:
                        </label>
                        <select
                            id="name"
                            name="name"
                            value={nameId}
                            onChange={handleNameIdChange}
                        >
                            {options}
                        </select>
                    </div>
                    <div>
                        <p>Created:<br />{created}</p>
                        <p>Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        
        
        </>
    )
    
    return content
}

export default EditNoteForm