"use client";

import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Failed to delete the topic");
        }

        console.log("Topic deleted successfully");

        // Refresh the page or the data after deleting the topic
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
};

export default RemoveBtn;
