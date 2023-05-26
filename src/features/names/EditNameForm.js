import { useState, useEffect } from 'react'
import { useUpdateNameMutation, useDeleteNameMutation } from './namesApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { ROLES } from '../../config/roles'
import useAuth from '../../hooks/useAuth'

const NAME = /^[A-z]{3,20}$/
const PWD = /^[A-z0-9!@#$%]{4,12}$/

const EditNameForm = ({ name }) => {
    const { isAdmin } = useAuth()

    const [updateName, {
        isLoading, isSuccess, isError, error
    }] = useUpdateNameMutation()
    const [deleteName, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNameMutation()

    const navigate = useNavigate()

    const [username, setName] = useState(name.name)
    const [validName, setValidName] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(name.roles)
    const [active, setActive] = useState(name.active)

    // Verification
    useEffect(() => {
        setValidName(NAME.test(username))
    }, [username])
    
    useEffect(() => {
        setValidPassword(PWD.test(password))
    }, [password])
    
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setName('')
            setPassword('')
            setRoles([])
            navigate('/dashboard/names')
        }
    }, [isSuccess, isDelSuccess, navigate])
    
    if (!isAdmin) {
        return <p>Access Denied</p>
    }

    // Handlers
    const handleNameChange = e => setName(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)
    const handleRoleChange = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }
    const handleActiveChange = () => setActive(prev => !prev)

    const onSaveNameClicked = async (e) => {
        if (password) {
            await updateName({ id: name.id, username, password, roles, active })
        } else {
            await updateName({ id: name.id, username, roles, active })
        }
    }

    const onDeleteNameClicked = async () => {
        await deleteName({ id: name.id })
    }

    // define CanSave
    let canSave
    if (password) {
        canSave = [roles.length, validName, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validName].every(Boolean) && !isLoading
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}>
                    {role}
                </option>
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validNameClass = !validName ? 'invalid' : ''
    const validPwdClass = (password && !validPassword) ? 'invalid' : ''
    const validRolesClass = !Boolean(roles.length) ? 'invalid' : ''
    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>
                {errContent}
            </p>

            <form onSubmit={e => e.preventDefault()}>
                <div>
                    <h2>Change Persona</h2>
                    <div>
                        <button
                            title="Save"
                            onClick={onSaveNameClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            title="Delete"
                            onClick={onDeleteNameClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                
                <label htmlFor="name">
                    Name: <span>[3-20 letters]</span>
                </label>
                <input 
                    className={`${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete='off'
                    value={username}
                    onChange={handleNameChange}
                />

                <label htmlFor="password">
                    Password: <span>[Empty = no change]</span>
                </label>
                <input 
                    className={`${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />

                <label htmlFor="active">
                    ACTIVE:
                    <input 
                        id="active"
                        name="active"
                        type="checkbox"
                        checked={active}
                        onChange={handleActiveChange}
                    />
                </label>

                <label htmlFor="roles">
                    Assigned Roles:
                </label>
                <select
                    id="roles"
                    name="roles"
                    className={`${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={handleRoleChange}
                >
                    {options}
                </select>
            </form>
        </>
    )
    return content
}

export default EditNameForm