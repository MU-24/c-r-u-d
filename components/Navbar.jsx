import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div>
      <nav
        className="flex justify-between items-centerpx-16 py-3  px-12 bg-cover"
        style={{ backgroundImage: "url('/nav.jpg')" }}
      >
        <Link className=" text-white font-bold text-5xl" href={"/"}>
          MU24
        </Link>
        <Link className=" bg-white text-center p-3 font-bold" href={"/addTopic"}>
          Add Topic
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
