const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes')

app.use(cors());

mongoose.connect('mongodb://localhost:27017/person-list');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success');
  // let user = new User({username:'aaa',email:'123456@123.213',age:'24'});
  // user.save();
  // 往数据库里插入一条数据
});

routes(app)

app.listen(4000,function () {
  console.log('running on port 4000...');
})
