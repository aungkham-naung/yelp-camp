if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
const { descriptors, places } = require('./seedHelpers')

//mongoose database set-up
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//database connection with error checking
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})
const site = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65a430f03c3a1798c9d62fe8',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${site(descriptors)} ${site(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dgjp9l8rq/image/upload/v1705705517/YelpCamp/fpa986sr4x5go0llikrv.webp',
                    filename: 'YelpCamp/fpa986sr4x5go0llikrv',
                },
                {
                    url: 'https://res.cloudinary.com/dgjp9l8rq/image/upload/v1705705517/YelpCamp/osloru9ebljfjoyyrvoa.jpg',
                    filename: 'YelpCamp/osloru9ebljfjoyyrvoa',
                }
            ],
            description: 'Thank you for visiting our YelpCamp',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
