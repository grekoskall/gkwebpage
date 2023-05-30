import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashBoard = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <DashHeader />
        <div>
            <Outlet />
        </div>
        <DashFooter />
    </div>
  )
}

export default DashBoard