"use client";

import React, { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics");
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics", error);
    return { topics: [] }; // Return a default value to prevent undefined
  }
};

const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data.topics || []); // Handle undefined or missing topics
    };
    fetchTopics();
  }, []);

  return (
    <div>
      {topics.length > 0 ? (
        topics.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start bg-black bg-opacity-75 text-white"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>
            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No topics available</div>
      )}
    </div>
  );
};

export default TopicsList;
