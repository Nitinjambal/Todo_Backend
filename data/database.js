import mongoose from "mongoose";

//dataBase
export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            dbName: "Reliance_Backend",
        })
        .then(() => {
            console.log("DataBase Connected");
        })
        .catch((err) => {
            console.log(err);
        });
}
