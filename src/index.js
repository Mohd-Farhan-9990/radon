const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',route);
mongoose.connect("mongodb+srv://MohdFarhan9990:LxP62162nUtlmSsp@cluster0.1zhmxfg.mongodb.net/Assignment-JWT", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )




app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});
