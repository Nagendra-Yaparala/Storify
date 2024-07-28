import React from 'react';

const EditItem = () => {
  return (
    <div className='flex flex-col gap-5'>
        <input type="text" defaultValue={title} className='p-4 border focus:border-b-indigo-800' placeholder='Topic Title' />
        <input type="text" defaultValue={description} className='p-4 border' placeholder='Topic Description' />
        <button className='bg-green-500 rounded-sm p-3 w-fit'>Update Topic</button>
    </div>
  );
};

export default EditItem;
