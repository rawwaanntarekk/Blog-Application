import React from 'react'
import Image from 'next/image'
import img from '../../public/Images/Error.png'

export default function NotFound() {
  return (
    <div className='position-absolute start-50 top-50 translate-middle'>
      <Image src={img} alt='not-found'></Image>
    </div>
  )
}
