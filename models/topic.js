// import mongoose, { schema } from "mongoose";

// const topicSchema = new schema(
//   {
//     title: String,
//     description: String,
//   },
//   {
//     timestamps: true,
//   }
// );
// const Topic = mongoose.model.Topic || mongoose.model("Topic", topicSchema);
// export default Topic;



import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Topic || mongoose.model("Topic", topicSchema);

