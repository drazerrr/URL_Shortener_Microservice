import dotenv from 'dotenv'
import app from "./app.js";
import connectDB from "./db/connectionDB.js";

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    const port = process.env.PORT || 4000
    app.on('error', (error) => {
        console.log("Something went wrong ", error)
    });

    app.listen(port, () => {
        console.log("⚙ Server is running at port ", port)
    })
})
.catch((error) => {
    console.log("connection error ", error)
});