import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://JanJan594:130613Minsung@cluster0.xwedesz.mongodb.net/library_control?appName=Cluster0"
  )
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

export default mongoose; 