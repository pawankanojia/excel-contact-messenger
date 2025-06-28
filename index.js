const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/upload');
const emailRoutes = require('./routes/email');
const whatsappRoutes = require('./routes/whatsapp');
const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/template');
const logRoutes = require('./routes/logs');
const contactRoutes = require('./routes/contacts');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



// Set Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', uploadRoutes);
app.use('/api/v1', emailRoutes);
app.use('/api/v1', whatsappRoutes);
app.use('/api/v1', templateRoutes);
app.use('/api/v1', logRoutes);
app.use('/api/v1', contactRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log('Mongo Error:', err));

app.get('/', (req, res) => res.send('Server Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
