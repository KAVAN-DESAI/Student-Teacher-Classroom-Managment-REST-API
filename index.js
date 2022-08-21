const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');

//Import routes
const authRoute = require('./routes/auth');

const postRoute = require('./routes/posts');

const classroomRoute = require('./routes/classroom');

const feedRoute = require('./routes/feed');

dotenv.config();


//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, () => console.log("Connected to mongo DB!"))

//Middleware
app.use(express.json());

//Route middleware
app.use('/api/user', authRoute);

app.use('/api/posts', postRoute);

app.use('/api/classroom', classroomRoute);

app.use('/api/feed', feedRoute);

app.listen(3000, () => console.log("Server is up running..."))