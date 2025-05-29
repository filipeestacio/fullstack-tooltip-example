import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

const connect = async() => {
    try {
        console.log("starting MongoDB in memory server...");
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        console.log("In-Memory DB uri:", uri);
        await mongoose.connect(uri);
        console.log("connected to MongoDB server");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const disconnect = async() => {
    mongoose.connection.close();
    await mongoServer.stop();
}

export {
    connect,
    disconnect
}