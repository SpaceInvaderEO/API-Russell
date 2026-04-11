const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const catwaysRoutes = require('./routes/catways');
const reservationsRoutes = require('./routes/reservations');
const usersRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', authRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/catways', catwaysRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;

const Catway = require('./models/Catway');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const catwaysData = require('./Fichiers/catways.json');

async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const catwayCount = await Catway.countDocuments();
        if (catwayCount === 0) {
            await Catway.insertMany(catwaysData);
            
            const adminExists = await User.findOne({ email: 'admin@russell.com' });
            if (!adminExists) {
                const hashedPassword = await bcrypt.hash('admin123', 10);
                await User.create({
                    username: 'admin',
                    email: 'admin@russell.com',
                    password: hashedPassword
                });
            }
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Startup error:', err);
        process.exit(1);
    }
}

startServer();
