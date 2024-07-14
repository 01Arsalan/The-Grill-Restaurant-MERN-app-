import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number
});

const dealSchema = new mongoose.Schema({
    price: Number,
    above: Number,
    code: String,
    img: imageSchema
});

const locationSchema = new mongoose.Schema({
    place: String,
    img: imageSchema
});

const exploreSchema = new mongoose.Schema({
    name: String,
    img: imageSchema
});

const bestSellerSchema = new mongoose.Schema({
    name: String,
    detail: String,
    img: imageSchema
});

const reviewSchema = new mongoose.Schema({
    name: String,
    review: String
});

const categorySchema = new mongoose.Schema({
    title: String,
    itemNum: String,
    id: String,
    img: imageSchema
});

const foodItemSchema = new mongoose.Schema({
    name: String,
    price: String,
    img: imageSchema,
    type: String,
    id: String
});

const foodCategorySchema = new mongoose.Schema({
    name: String,
    items: [foodItemSchema]
});

const footerSchema = new mongoose.Schema({
    paymentImg: imageSchema,
    followImg: {
        img1: imageSchema
    }
});

const menuItemSchema = new mongoose.Schema({
    foodData: {
        SNACK: [foodItemSchema],
        SALAD: [foodItemSchema],
        COFFEE_TEA: [foodItemSchema],
        STAKE: [foodItemSchema],
        WESTERN_COMFORT: [foodItemSchema],
        KASHMIRI_COMFORT: [foodItemSchema],
        DESSERT: [foodItemSchema]
    },
    discountLogo: imageSchema
});

const dataSchema = new mongoose.Schema({
    nav: {
        logo: imageSchema,
        userData: { loggedIn: Boolean }
    },
    home: { img: imageSchema },
    deals: [dealSchema],
    about: { img: imageSchema },
    message: { img: imageSchema },
    journey: { img: imageSchema },
    location: [locationSchema],
    quality: {
        img1: imageSchema,
        img2: imageSchema,
        img3: imageSchema
    },
    explore: [exploreSchema],
    bestSellers: [bestSellerSchema],
    franchise: {
        img1: imageSchema,
        img2: imageSchema
    },
    reviews: [reviewSchema],
    footer: footerSchema,
    category: [categorySchema],
    menuItem: menuItemSchema,
    cart: [imageSchema],
    checkout: {
        img1: imageSchema,
        img2: imageSchema,
        img3: imageSchema
    }
});

export default mongoose.model('Data', dataSchema);

