const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const adminRoutes = require('./router/adminRoutes');
const feedbackRoutes = require('./router/feedbackRoutes');
const { initializeModels } = require('./utils/initalize');

const app = express();
initializeModels();
app.use(cors());

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});