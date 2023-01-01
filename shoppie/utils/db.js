import mongoose from "mongoose";
const connection = {};

async function connectDb() {
    // Check if we have connection to our databse
    if (connection.isConnected) {
        console.log("Already connected to Database.");
        return;
    }
    // Use new database connection
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected == 1) {
            console.log("Using existing connection.");
            return;
        }
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("New connection to the database.");
    connection.isConnected = db.connections[0].readyState;
}

async function discountDB() {
    if (connection.isConnected) {
        if (process.env.NODE_END === "production") {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("Not in production mode. Not disconnecting from database.");
        }

    }
}

const db = { connectDb, discountDB };
export default db;





