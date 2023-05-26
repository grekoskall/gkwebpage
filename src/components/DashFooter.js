import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { name, status } = useAuth()
    const onGoHomeClicked = () => navigate('/dashboard')

    let goHomeButton = null
    if (pathname !== '/dashboard') {
        goHomeButton = (
            <button title="Home" onClick={onGoHomeClicked}>
                <FontAwesomeIcon icon={faHouse}/>
            </button>
        )
    }

    const content = (
        <footer>
            {goHomeButton}
            <p>
                Current Name: {name}
            </p>
            <p>
                Status: {status}
            </p>
        </footer>
    )
  return content
}

export default DashFooter