'use client'
import React, { useEffect } from 'react'
import { MdDeleteSweep } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Link from 'next/link';
import useRouter from 'next/navigation';

const getTopic = async ()=>{
  try{
      const res = await fetch('http://localhost:3000/api/topics',{cache:'no-store'});

      if(!res.ok){
        throw new Error("Failed to fetch Topics");
      }
      console.log(res);
      return res.json();
  }catch(err){
      console.log("error Loading topics",err);
  }
}

const TopicsList = async() => {
const {topics} = await getTopic();
const handleDelete = async(id)=>{
  try{
      const res = await fetch(`http://localhost:3000/api/topics/${id}`,
        {
          method:'DELETE',
          headers:{
            "Content-type":'application/json'
          }
        }
      )
      if(!res.ok){
        throw new Error("Failed to delete the topic");
      }
      const result = await res.json();
      console.log(result);
  }
  catch(err){
    console.log(err);
  }
    
}
return (
  <div className='flex flex-col border p-4'>
    {topics.map((item, index) => (
      <div key={index} className='flex justify-between items-center border-b py-2'>
        <div>
          <h1 className='font-bold text-green-500 text-2xl mb-2'>{item.title}</h1>
          <p className='font-semibold'>{item.description}</p>
          <p>{item.createdAt}</p>
        </div>
        <div className='flex gap-4'>
          
            <button onClick={()=>{handleDelete(item._id)}}><MdDeleteSweep className='text-3x'/></button>
      
          <Link href={`/edit/${item._id}`}>
            <BiSolidEdit className='text-3xl cursor-pointer' />
          </Link>
        </div>
      </div>
    ))}
  </div>
);

}

export default TopicsList