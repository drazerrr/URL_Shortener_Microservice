import app from "./app.js";
import connectDB from "./DB/connection.js";
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
});


connectDB()
.then(() => {
    const port = process.env.PORT || 4000
    app.on("error", (error) => {
        console.log("ERROR ", error)
    });
    app.listen(port, () => {
        console.log("⚙ Server is running at port ", port)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed", error)
})
