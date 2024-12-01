import mongoose, { ConnectOptions } from "mongoose";

let isConncected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MISSING MONGODB_URI");
  }

  if (isConncected) {
    return;
  }

  try {
    const options: ConnectOptions = {
      dbName: "cine-max",
      autoCreate: true,
    };
    await mongoose.connect(process.env.MONGODB_URI!, options);
    isConncected = true;
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};
