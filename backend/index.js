require('dotenv').config();
require('./app');

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
