import Cors from "micro-cors";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";

const cors = Cors({
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  origin: "https://crud-app24.netlify.app", // Adjust the origin as needed
});

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req, res) {
  const { method } = req;

  await connectMongoDB();

  switch (method) {
    case "GET":
      const topics = await Topic.find();
      return res.status(200).json({ topics });
    case "POST":
      const { title, description } = req.body;
      await Topic.create({ title, description });
      return res.status(201).json({ message: "Topic created" });
    case "PUT":
      const { id } = req.query;
      const { newTitle, newDescription } = req.body;
      const updatedTopic = await Topic.findByIdAndUpdate(
        id,
        { title: newTitle, description: newDescription },
        { new: true }
      );

      if (!updatedTopic) {
        return res.status(404).json({ message: "Topic not found" });
      }

      return res
        .status(200)
        .json({ message: "Topic updated", topic: updatedTopic });
    case "DELETE":
      const deleteId = req.query.id;
      await Topic.findByIdAndDelete(deleteId);
      return res.status(200).json({ message: "Topic deleted" });
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default cors(handler);
