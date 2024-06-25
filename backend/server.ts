import express, { Application } from "express";
import mongoose from 'mongoose';
import 'dotenv/config'
import Server from "./src/index";



const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const server: Server = new Server(app);

app
  .listen(PORT, "localhost", async function () {
    console.log(`Server is running on port ${PORT}.`);
    console.log(process.env.MONGO_URL)

    if(process.env.MONGO_URL !== undefined)
    await mongoose.connect(process.env.MONGO_URL)

    app.listen(PORT, ()=>{
        console.log(`server started on ${PORT}`)
    })
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
