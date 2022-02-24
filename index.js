const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const layouts = require('express-ejs-layouts');
const port = process.env.PORT || 7000;
const pageRouter = require('./routers/pageRouter');
const apiPageRouter = require('./routers/apiPageRouter');
const { checkNetworkStatus } = require('check-network-status');
const cors = require('cors');
//require('dotenv').config();  //changed 23/1/22
const app = express();
app.use(cors);
checkNetworkStatus({
    timeout: 3000,
    //backUpURL: 'https://example.com',
    pingDomain: 'google.com',
    method: 'GET'
}).then((value) => {console.log(value)});
mongoose.connect( "mongodb+srv://msjDb:ladoo1827@cluster0.wv9sp.mongodb.net/analyticaMain?retryWrites=true&w=majority",{/*useNewUrlParser:true,useCreateIndex: true,useUnifiedTopology:true*/});
const db = mongoose.connection;
db.once('open',()=>{
    console.log('db connected');
});
var bodyParser = require('body-parser'); //changed 23/1/22
app.use(bodyParser.urlencoded({ extended : true })); //changed 23/1/22
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(layouts);
mongoose.Promise=global.Promise;
app.use(express.static(__dirname+'/static/js'));
app.use('/',pageRouter);
app.use('/apiPageRouter',apiPageRouter);
//app.use('/api',apiFetchRouter);

app.listen(port,()=>console.log(`app is running on port${port}`));

