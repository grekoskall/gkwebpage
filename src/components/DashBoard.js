import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashBoard = () => {
  return (
    <>
        <DashHeader />
        <div>
            <Outlet />
        </div>
        <DashFooter />
    </>
  )
}

export default DashBoard