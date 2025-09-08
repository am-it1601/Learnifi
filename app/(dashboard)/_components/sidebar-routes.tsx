'use client'

import { BarChart, Compass, Layout, List } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'
import { usePathname } from 'next/navigation'

const guestRoutes = [
    { icon : Layout, label : 'Dashboard', href : '/' },
    { icon : Compass, label : 'Browse', href : '/search' },

]

const teacherRoutes = [
    { icon : List, label : 'Courses', href : '/teacher/courses' },
    { icon : BarChart, label : 'Analytics', href : '/teacher/analytics' },

]

export const SidebarBarRoutes = () =>{
  const pathname = usePathname();
  const isTeacher = pathname?.startsWith('/teacher');
  const routes = isTeacher ? teacherRoutes : guestRoutes;
  //
  return (
    <div className='flex flex-col w-full'>
        {routes.map((route) => (
            <SidebarItem key={route.href} icon={route.icon} href={route.href} label={route.label} />
        ))}
    </div>
  )
}



export default SidebarBarRoutes