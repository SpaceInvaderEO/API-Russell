const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');
const catwaysData = require('./Fichiers/catways.json');
const reservationsData = require('./Fichiers/reservations.json');
require('dotenv').config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Catway.deleteMany({});
        await Reservation.deleteMany({});
        await User.deleteMany({});

        await Catway.insertMany(catwaysData);
        await Reservation.insertMany(reservationsData);

        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin',
            email: 'admin@russell.com',
            password: hashedPassword
        });

        console.log('Database seeded successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
