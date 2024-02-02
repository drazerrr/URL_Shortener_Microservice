require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dns = require('dns');
const mySecret = process.env.MONGO_URI;
mongoose.connect( mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url: Number
});

let Url = mongoose.model('Url', urlSchema);

app.use(bodyParser.urlencoded({extended: false}));


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  let url = req.body.url; 
  try {
    let valid = new URL(url);
    dns.lookup(valid.hostname, (err, address, family) => {
      if (! address) {
        res.json({error: 'invalid url'})
      } else
    Url.findOne({original_url: valid.href}, (err, data) => {
      if (! data) {
        let random = Math.floor(Math.random() * 10000);
        let dbupload = new Url({original_url: valid.href, short_url: random});
        dbupload.save((err, data) => {
          if (err) {
            console.log(err)
          }
        })
      } else {
        return res.json({original_url: data.original_url, short_url: data.short_url});
      }
    })
   })   
  } catch(e){
    res.json({error: "invalid url"})
  }
});

app.get("/api/shorturl/:short_url", (req, res) => {
  let short_url = req.params.short_url;
  Url.findOne({short_url: short_url}, (err, data) => {
    if(! data) {
      res.json({error: "invalid url"})
    } else {
      res.redirect(data.original_url)
    }
  })
})
     
      

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
