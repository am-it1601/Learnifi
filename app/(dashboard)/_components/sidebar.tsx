import React from 'react'
import Logo from './logo'
import SidebarBarRoutes from './sidebar-routes'

function Sidebar() {
  return (
    <div className='h-full border-r flex flex-col bg-white shadow-xs overflow-y-auto'>
        <div className="p-8">
            <Logo />
        </div>
        <div className="flex flex-col w-full">
          <SidebarBarRoutes />
        </div>
    </div>
  )
}

export default Sidebar