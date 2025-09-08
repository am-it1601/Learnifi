import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <Image src={'/logo.svg'} height={130} width={130} alt='Logo' />
  )
}

export default Logo