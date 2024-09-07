const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const DB = require('./config/Db');


const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    
}));
app.use(express.json());
DB();

app.use('/api', require('./Route/routes.js'));

app.listen(port, () => console.log(`Server started on port ${port}`));

