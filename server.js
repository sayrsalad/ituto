require('dotenv').config({path: "./config.env"});

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const AuthRouter = require('./routes/auth');

app.use(express.json());

app.use('/api/auth', AuthRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});

//Error Handler (END)
app.use(errorHandler);


// const cors = require('cors');
// const mongoose = require('mongoose'); 

// require('dotenv').config();




// app.use(cors());
// app.use(express.json());

// const URI = process.env.ATLAS_URI;
// mongoose.connect(URI);

// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log(`Established`);
// });

// app.use('/actor', ActorRouter);
// app.use('/movie', MovieRouter);
// app.use('/genre', GenreRouter);
// app.use('/producer', ProducerRouter);

