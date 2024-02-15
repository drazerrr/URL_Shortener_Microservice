import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/public", express.static(`${process.cwd()}/public`))
app.use("/", (req, res) => {
    res.sendFile(`${process.cwd()}/view/index.html`)
});




export default app
