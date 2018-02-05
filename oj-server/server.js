const express = require('express');
const app = express();
const restRouter = require('./routes/rest');

// connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://wxm146:Mwl930524@ds141474.mlab.com:41474/ojsystem');

//app.get('/', (req, res) => res.send('Hello World!!!'));
app.use('/api/v1', restRouter);

app.listen(3000, () => console.log('Example app listening on port 3000!'));