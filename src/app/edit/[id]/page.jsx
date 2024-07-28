"use client";

import React, { useEffect, useState } from "react";
import Edit from "../page";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const EditPage = ({ params }) => {
  const [topic, setTopic] = useState({});
  const { id } = params;
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const getTopic = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch Topics");
      }
      return res.json();
    } catch (err) {
      console.log("failed to get topic", err);
    }
  };

  useEffect(() => {
    const fetchTopic = async () => {
      const { topic: topicData } = await getTopic(id);
      setTopic(topicData);
    };

    fetchTopic();
  }, [id]);
  console.log(topic);

  const onSubmit = async ({ title, desc }) => {
    console.log(title, desc);
    try {
      const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ newTitle:title, newDescription:desc })
      });

      if (!response.ok) {
        throw new Error("Failed to update topic");
      }

      const result = await response.json();
      console.log(result);
     router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {topic && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                defaultValue={topic.title}
                className="p-4 border focus:border-b-indigo-800"
                placeholder="Topic Title"
                name="title"
                {...register("title", { required: false })}
              />
              <input
                type="text"
                defaultValue={topic.description}
                className="p-4 border"
                placeholder="Topic Description"
                name="desc"
                {...register("desc", { required: false })}
              />
              <button
                className="bg-green-500 rounded-sm p-3 w-fit"
                type="submit"
              >
                Update Topic
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPage;
