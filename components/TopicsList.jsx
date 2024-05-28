"use client";

import React, { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading topics", error);
    return { topics: [] }; // Return a default value
  }
};

const TopicsList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data.topics || []); // Handle undefined
    };
    fetchTopics();
  }, []);

  return (
    <div>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start bg-black bg-opacity-65"
        >
          <div>
            <h2 className="font-bold text-2xl text-white">{t.title}</h2>
            <div className="text-white">{t.description}</div>
          </div>
          <div className="flex gap-2 text-white">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicsList;
