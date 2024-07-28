'use client'
import React, { useState, useEffect } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Link from 'next/link';

const TopicsList = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/topics', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error("Failed to fetch Topics");
        }
        const data = await res.json();
        setTopics(data.topics);
      } catch (err) {
        console.error("Error loading topics", err);
        setError(err.message);
      }
    };

    fetchTopics();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      if (!res.ok) {
        throw new Error("Failed to delete the topic");
      }
      const result = await res.json();
      console.log(result);

      // Refresh topics list after deletion
      setTopics(topics.filter(topic => topic._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
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
            <button onClick={() => { handleDelete(item._id) }}>
              <MdDeleteSweep className='text-3xl' />
            </button>
            <Link href={`/edit/${item._id}`}>
              <BiSolidEdit className='text-3xl cursor-pointer' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicsList;
