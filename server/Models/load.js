import mongoose from "mongoose"
const { Schema } = mongoose

// Sub-schemas for nested documents
const ImageSchema = new Schema({
    url: { type: String, required: true }
});

const UserDataSchema = new Schema({
    loggedIn: { type: Boolean, required: true },
});

const DealSchema = new Schema({
    price: { type: Number, required: true },
    above: { type: Number, required: true },
    code: { type: String, required: true },
    img: ImageSchema
});

const LocationSchema = new Schema({
    place: { type: String, required: true },
    img: ImageSchema
});

const ExploreSchema = new Schema({
    name: { type: String, required: true },
    img: ImageSchema
});

const BestSellerSchema = new Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    img: ImageSchema
});

const ReviewSchema = new Schema({
    name: { type: String, required: true },
    review: { type: String, required: true }
});

const FollowImgSchema = new Schema({
    img1: ImageSchema,
    img2: ImageSchema,
    img3: ImageSchema,
    img4: ImageSchema
});

const FooterSchema = new Schema({
    paymentImg: ImageSchema,
    followImg: FollowImgSchema
});

const CategorySchema = new Schema({
    title: { type: String, required: true },
    itemNum: { type: String, required: true },
    id: { type: String, required: true },
    img: ImageSchema
});

const MenuItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    img: ImageSchema,
    type: { type: String, required: true },
    id: { type: String, required: true }
});

const MenuSchema = new Schema({
    foodData: {
        SNACK: [MenuItemSchema],
        SALAD: [MenuItemSchema],
        COFFEE_TEA: [MenuItemSchema],
        STAKE: [MenuItemSchema],
        WESTERN_COMFORT: [MenuItemSchema],
        KASHMIRI_COMFORT: [MenuItemSchema],
        DESSERT: [MenuItemSchema]
    },
    discountLogo: ImageSchema
});


// Main Home-Page Schema
const DataSchema = new Schema({
    nav: {
        logo: ImageSchema,
        userData: UserDataSchema
    },
    home: { img: ImageSchema },
    deals: [DealSchema],
    about: { img: ImageSchema },
    message: { img: ImageSchema },
    journey: { img: ImageSchema },
    location: [LocationSchema],
    quality: {
        img1: ImageSchema,
        img2: ImageSchema,
        img3: ImageSchema,
        img4: ImageSchema
    },
    explore: [ExploreSchema],
    bestSellers: [BestSellerSchema],
    franchise: {
        img1: ImageSchema,
        img2: ImageSchema
    },
    reviews: [ReviewSchema],
    footer: FooterSchema,
    category: [CategorySchema],
    menuItem: MenuSchema,
    cart: [ImageSchema],
    checkout: {
        img1: ImageSchema,
        img2: ImageSchema,
        img3: ImageSchema
    }
})

export default mongoose.model('Data', DataSchema)
