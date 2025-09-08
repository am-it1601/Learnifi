import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import db from '@/lib/db'


async function CoursePage () {
  const {userId} =  await auth()
  if (!userId) {
    return redirect('/')
  }
  const courses = await db.course.findMany({
    where: {
      userId
    },
    orderBy:{
      createdAt: 'desc'
    }
  })
  return (
   
      <div className="container mx-auto py-10">
      <DataTable columns={columns} data={courses} />
    </div>
  )
}

export default CoursePage