const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const moment = require('moment');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://MohdFarhan9990:LxP62162nUtlmSsp@cluster0.1zhmxfg.mongodb.net/MohdFarhan99-DB", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use (
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         next();
//   }
//   );

  app.use (
    function (req, res, next) {
        console.log ("Hlw, This is Global Middleware of assignment");
        let date = Date.now()
        console.log(date)
        let date1 = moment(date).format('YYYY-MM-DD, h:mm:ss')
            console.log(date1)
         const path = req.path
        console.log(path)
        const IP = req.socket.localAddress
        console.log(IP)
        next();
  }
  );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
