import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING as string);
        console.log(`DataBase Connected with the :- \n Host:- ${connect.connection.host} \n Document Name:- ${connect.connection.name}`);
    } catch (err) {
        console.error("Error connecting to the database.", err);
        process.exit(1);
    }
};

