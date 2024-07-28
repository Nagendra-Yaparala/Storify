import Link from 'next/link'
import React from 'react'

const TopBar = () => {
  return (
    <div className='bg-gray-900 text-white flex justify-between items-center p-4 max-w-screen  mx-40 mt-7'>
        <div>
            <h1 className='font-bold text-2xl text-green-600'>Storify</h1>
        </div>
        <div>
           <Link href={'/addtopic'}> <button className='bg-white text-black p-4 rounded font-semibold'>Add Topic</button></Link>
        </div>
    </div>
  )
}

export default TopBar