import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'

function DashboardLayout({children}) {
  return (
    <div>
        <div className="fixed md:w-64 hidden md:block bg-WhiteSmoke">

            <SideNav/>
        </div>
        <div className='flex-1 ml-0 md:ml:64 bg-WhiteSmoke '>
          <DashboardHeader/>
        {children}
        </div>
        
        </div>
  )
}

export default  DashboardLayout