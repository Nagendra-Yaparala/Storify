import React from 'react'

const addlistitem = () => {
  return (
    <div className='flex flex-col gap-5'>
        <input type="text" className='p-4 border focus:border-b-indigo-800 ' placeholder='Topic Title' />
        <input type="text" className='p-4 border ' placeholder='Topic Description' />
        <button className='bg-green-500 rounded-sm p-3 w-fit'>Add Topic</button>
    </div>
  )
}

export default addlistitem