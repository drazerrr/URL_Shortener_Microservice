import express from 'express';
import cors from 'cors'
import Url from './models/url.model.js'
import dns from 'dns'

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/public", express.static(`${process.cwd()}/public`))
app.get("/", (req, res) => {
    res.sendFile(`${process.cwd()}/views/index.html`)
})

app.get("/api/hello", (req, res) => {
    res.json({greetings: "Hello User"})
})

app.post("/api/shorturl", async (req, res) => {
    const url = req.body.url
    try {
        const validUrl = new URL(url)
        dns.lookup(validUrl.hostname, async function(err, address, family) {
            if(err) {
                 res.json({error: "Invalid url"}) 
                 return;
            } else {
                const check = await Url.findOne({originalUrl: url}).select("-_id -__v");
                if(check) {
                    return res.json(check)
                }

                const all = await Url.find();
                const short_number = all.length + 1;
                const value = await Url.create({
                    originalUrl: url,
                    short_url: short_number
                })
                res.json({
                    originalUrl: value.originalUrl,
                    short_url: value.short_url
                })
            }
        });
        
        
    } catch (error) {
        res.json({error: "Invalid url"})
    }
})

app.get("/api/shorturl/:short_url", async (req, res) => {
    const url = req.params.short_url;
    try {
        const data = await Url.findOne({short_url: url}).select("-_id -__v");
        if(data) {
            res.redirect(data.originalUrl)
        }else {
            res.json({error: "No short URL found for the given input"})
        }
    } catch (error) {
        console.log("Something went wrong ", error)
    }
})




export default app;