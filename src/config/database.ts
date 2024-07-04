import mongoose from "mongoose";


export const connectDatabase = async () => {
    const databaseUrl: string = process.env.MONGO_DB ?? '';
    try {
        await mongoose.connect(databaseUrl);
        console.log('Connected to MongoDB!')
    } catch (error) {
        console.log(error)
    }
}