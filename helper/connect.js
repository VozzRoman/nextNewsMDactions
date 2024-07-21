import mongoose from "mongoose";

export const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log("Connect to mongoDB");
	} catch (error) {
		throw new Error("Error connect");
	}
}
