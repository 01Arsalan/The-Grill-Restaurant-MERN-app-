import mongoose from "mongoose"
import DataModel from './dataSchema.js';
import {v2 as cloudinary} from "cloudinary"



const dbUrl = "XXXX";

// Connect to MongoDB
mongoose.connect(dbUrl, {})
    .then(() => {
        console.log("connected To DB.")
    })
    .catch((err) => {
        console.log("Connection To DB Failed,Error : ", err)
    })

cloudinary.config({
    cloud_name: "XXX",
    api_key: "XXX",
    api_secret: "XXX"
})


// Utility function to upload image to Cloudinary

const uploadImage = async (filePath, width, height) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "FoodCamp",
            transformation: [
                { width, height, crop: "fill" }
            ]
        });
        return { url: result.secure_url };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};


const seedDB = async () => {
    //empytying collection
    await DataModel.deleteMany({})

    try {
        const logo = await uploadImage('./server/Seeds/img seeds/fran_logo.png',130,98); // Adjust the path
        const homeImg = await uploadImage('./server/Seeds/img seeds/home_grill.png',1364,383);
        const dealImgs = [
            await uploadImage('./server/Seeds/img seeds/food_images/grilled_seabass_fillet.jpeg',150,150),
            await uploadImage('./server/Seeds/img seeds/food_images/pomelo_salad.webp',150,150),
            await uploadImage('./server/Seeds/img seeds/food_images/tenderloin.jpeg',150,150),
            await uploadImage('./server/Seeds/img seeds/food_images/Häagen-Dazs (ice cream).jpeg',150,150),
            await uploadImage('./server/Seeds/img seeds/food_images/chicken_koram.jpeg',150,150),
            await uploadImage('./server/Seeds/img seeds/food_images/chick_peas.webp',150,150)
        ];
        const aboutImg = await uploadImage('./server/Seeds/img seeds/about-img.jpeg',266,155);
        const messageImg = await uploadImage('./server/Seeds/img seeds/message_img.jpeg',1110,231);
        const journeyImg = await uploadImage('./server/Seeds/img seeds/journey_img.png',800,800);
        const locationImgs = [
            await uploadImage('./server/Seeds/img seeds/location_images/london.png',192,128),
            await uploadImage('./server/Seeds/img seeds/location_images/pulwama.png',192,128),
            await uploadImage('./server/Seeds/img seeds/location_images/srinagar.png',192,128),
            await uploadImage('./server/Seeds/img seeds/location_images/yejbyour.png',192,128)
        ];
        const qualityImgs = {
            img1: await uploadImage('./server/Seeds/img seeds/quality_images/fresh-dough.svg',50,50),
            img2: await uploadImage('./server/Seeds/img seeds/quality_images/quality_img.svg',50,50),
            img3: await uploadImage('./server/Seeds/img seeds/quality_images/safety-and-quality.svg',50,50),
        };
        const exploreImgs = [
            await uploadImage("./server/Seeds/img seeds/food_images/cinnamonSmoked_pu'er.jpeg",180,130),
            await uploadImage('./server/Seeds/img seeds/food_images/Profiterole  .jpeg',180,130),
            await uploadImage('./server/Seeds/img seeds/food_images/espresso.webp',180,130),
            await uploadImage('./server/Seeds/img seeds/food_images/raspberry_lemon.webp',180,130),
            await uploadImage('./server/Seeds/img seeds/food_images/spaghetti.jpeg',180,130)
        ];
        const bestSellerImgs = [
            await uploadImage('./server/Seeds/img seeds/food_images/chicken_boneless_wings.jpeg',320,224),
            await uploadImage('./server/Seeds/img seeds/food_images/tabak_maaz.avif',320,224),
            await uploadImage('./server/Seeds/img seeds/food_images/crispy_fried_babySquid.jpeg',320,224)
        ];
        const franchiseImgs = {
            img1: await uploadImage('./server/Seeds/img seeds/franchise.jpeg',1083,226),
            img2: await uploadImage('./server/Seeds/img seeds/fran_logo.png',200,150)
        };
        const footerImgs = {
            paymentImg: await uploadImage('./server/Seeds/img seeds/payment_icons.png',224,96),
            followImg: {
                img1: await uploadImage('./server/Seeds/img seeds/socialMedia.png',200,100),
                // img2: await uploadImage('path/to/follow2.png'),
                // img3: await uploadImage('path/to/follow3.png'),
                // img4: await uploadImage('path/to/follow4.png')
            }
        };
        const categoryImgs=[
            await uploadImage('./server/Seeds/img seeds/category_images/snack.png',50,32),
            await uploadImage('./server/Seeds/img seeds/category_images/salad.png',50,32),
            await uploadImage('./server/Seeds/img seeds/category_images/coffee_tea.png',50,32),
            await uploadImage('./server/Seeds/img seeds/category_images/steak.png',50,32),
            await uploadImage('./server/Seeds/img seeds/category_images/west.png',50,32),
            await uploadImage('./server/Seeds/img seeds/category_images/kashmir.png',50,32),
            await uploadImage('./server/Seeds/img seeds/category_images/dessert.png',50,32),
        ];
        const menuImgs={
            foodImgs:[
                await uploadImage('./server/Seeds/img seeds/food_images/corn_tortilla_chips.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/crispy_fried_babySquid.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/chicken_satay.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/spring_rolls.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/korean_fried_muttonDumplings.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/chicken_boneless_wings.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/ceaser_salad.webp',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/ceaser_salad_smokedSalmon.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/greek_salad.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/pomelo_salad.webp',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/espresso.webp',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/latte.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/americano.webp',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/falt_white.webp',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/double_espresso.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/raspberry_lemon.webp',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/lemonGrass_Ginger.jpeg',150,150),
                await uploadImage("./server/Seeds/img seeds/food_images/cinnamonSmoked_pu'er.jpeg",150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/rib_eye.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/tenderloin.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/spaghetti.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/grilled_seabass_fillet.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/grilled_norwegian_salman.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/chick_peas.webp',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/yakhni.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/chicken_koram.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/tabak_maaz.avif',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/rogan_gosh.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/chilled_mango_pomeloSago.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/seasonal_sliced_fruit.jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/Häagen-Dazs (ice cream).jpeg',150,150),
                await uploadImage('./server/Seeds/img seeds/food_images/Profiterole  .jpeg',150,150),
            ],
            discountLogo: await uploadImage('./server/Seeds/img seeds/discount_logo.png',30,30),   
        }
        const cartImgs=[
            await uploadImage('./server/Seeds/img seeds/cart_icons/delivery.png',25,25),
            await uploadImage('./server/Seeds/img seeds/cart_icons/pickup.png',25,25),
            await uploadImage('./server/Seeds/img seeds/cart_icons/dinein.png',25,25),
            await uploadImage('./server/Seeds/img seeds/cart_icons/car.png',25,25),
        ]
        const checkoutImgs={
            img1:await uploadImage('./server/Seeds/img seeds/discount.png',40,40),
            img2:await uploadImage('./server/Seeds/img seeds/food_logo.png',10,11),
            img3:await uploadImage('./server/Seeds/img seeds/input_logo.png',20,40),
        }




        const Data = new DataModel({
            nav: {
                logo,
                userData: { loggedIn: false }
            },
            home: { img: homeImg },
            deals: [
                { price: 50, above: 300, code: 'LPN50', img: dealImgs[0] },
                { price: 100, above: 500, code: 'LPN51', img: dealImgs[1] },
                { price: 200, above: 800, code: 'LPN83', img: dealImgs[2] },
                { price: 300, above: 1000, code: 'LPN27', img: dealImgs[3] },
                { price: 10, above: 150, code: 'LPN19', img: dealImgs[4] },
                { price: 30, above: 200, code: 'LPN00', img: dealImgs[5] },
            ],
            about: { img: aboutImg },
            message: { img: messageImg },
            journey: { img: journeyImg },
            location: [
                { place: 'Sopore', img: locationImgs[0] },
                { place: 'Yejbyour', img: locationImgs[1] },
                { place: 'Srinagar', img: locationImgs[2] },
                { place: 'Pulwama', img: locationImgs[3] }
            ],
            quality: qualityImgs,
            explore: [
                { name: "Cinnamon Smoked Pu'er", img: exploreImgs[0] },
                { name: 'Profiterole', img: exploreImgs[1] },
                { name: 'Espresso', img: exploreImgs[2] },
                { name: 'Raspberry Lemon', img: exploreImgs[3] },
                { name: 'Spaghetti', img: exploreImgs[4] }
            ],
            bestSellers: [
                { name: 'Chicken Boneless Wings', detail: 'Makes You Fly..', img: bestSellerImgs[0] },
                { name: 'Tabak Maaz', detail: 'Crispy And Fatty..', img: bestSellerImgs[1] },
                { name: 'Crispy Fried BabySquid', detail: 'Sofylicious..', img: bestSellerImgs[2] }
            ],
            franchise: franchiseImgs,
            reviews: [
                { name: 'Arsalan', review: 'Wow! The Grill is hands down the BEST restraunt in town. From the fast delivery to all kinds of food, and belive me, you cant go wrong here.' },
                { name: 'Asif', review: 'The Grill has set an unparalleled standard in town. Their swift delivery coupled with an extensive menu caters to every craving. Trust me, a vi...' },
                { name: 'Behrooz', review: "In a league of its own, The Grill surpasses expectations. From prompt deliveries to a diverse menu, it's a haven for food enthusiasts. Mark ..." },

            ],
            footer: footerImgs,
            category:[
                {title:"SNACK", itemNum:"6", id:"set_1", img:categoryImgs[0]},
                {title:"SALAD", itemNum:"4", id:"set_2", img:categoryImgs[1]},
                {title:"COFFEE & TEA", itemNum:"8", id:"set_3", img:categoryImgs[2]},
                {title:"STAKE", itemNum:"2", id:"set_4", img:categoryImgs[3]},
                {title:"WESTERN COMFORT", itemNum:"4", id:"set_5", img:categoryImgs[4]},
                {title:"KASHMIRI COMFORT", itemNum:"3", id:"set_6", img:categoryImgs[5]},
                {title:"DESSERT", itemNum:"4", id:"set_7", img:categoryImgs[6]}
            ],
            menuItem:{
                foodData:{
                    SNACK: [
                        { name: "Corn Tortilla Chips", price: "95", img:menuImgs.foodImgs[0], type: "veg", id: "item_1" },
                        { name: "Crispy Fried Baby Squid", price: "185", img:menuImgs.foodImgs[1], type: "non_veg", id: "item_2" },
                        { name: "Chicken Satay", price: "150", img:menuImgs.foodImgs[2], type: "non_veg", id: "item_3" },
                        { name: "Spring Rolls", price: "99", img:menuImgs.foodImgs[3], type: "veg", id: "item_4" },
                        { name: "Korean Fried Mutton Dumplings", price: "130", img:menuImgs.foodImgs[4], type: "non_veg", id: "item_5" },
                        { name: "Chicken Bone-less Wings", price: "125", img:menuImgs.foodImgs[5], type: "non_veg", id: "item_6" },
                    ],
                    SALAD: [
                        { name: "Caesar Salad", price: "180", img:menuImgs.foodImgs[6], type: "veg", id: "item_7" },
                        { name: "Ceaser Salad + Smoked Salmon", price: "285", img:menuImgs.foodImgs[7], type: "non_veg", id: "item_8" },
                        { name: "Greek Salad", price: "190", img:menuImgs.foodImgs[8], type: "veg", id: "item_9" },
                        { name: "Pomelo Salad", price: "195", img:menuImgs.foodImgs[9], type: "veg", id: "item_10" }
                    ],
                    COFFEE_TEA: [
                        { name: "Espresso", price: "70", img:menuImgs.foodImgs[10], type: "veg", id: "item_11" },
                        { name: "Latte", price: "70", img:menuImgs.foodImgs[11], type: "veg", id: "item_12" },
                        { name: "Americano", price: "80", img:menuImgs.foodImgs[12], type: "veg", id: "item_13" },
                        { name: "Flat-White", price: "99", img:menuImgs.foodImgs[13], type: "veg", id: "item_14" },
                        { name: "Double Espresso", price: "85", img:menuImgs.foodImgs[14], type: "veg", id: "item_15" },
                        { name: "Raspberry Lemon (Tea)", price: "105", img:menuImgs.foodImgs[15], type: "veg", id: "item_16" },
                        { name: "LemonGrass & Ginger (Tea)", price: "120", img:menuImgs.foodImgs[16], type: "veg", id: "item_17" },
                        { name: "Cinnamon Smoked Pu'er", price: "150", img:menuImgs.foodImgs[17], type: "veg", id: "item_19" },
                    ],
                    STAKE: [
                        { name: "Rib-eye", price: "1900", img:menuImgs.foodImgs[18], type: "non_veg", id: "item_19" },
                        { name: "Tenderloin", price: "1600", img:menuImgs.foodImgs[19], type: "non_veg", id: "item_20" },
                    ],
                    WESTERN_COMFORT: [
                        { name: "Spagetti", price: "340", img:menuImgs.foodImgs[29], type: "veg", id: "item_21" },
                        { name: "Grilled Seabass Fillet", price: "520", img:menuImgs.foodImgs[21], type: "non_veg", id: "item_22" },
                        { name: "Grilled Norwegian Salmon", price: "890", img:menuImgs.foodImgs[22], type: "non_veg", id: "item_23" },
                        { name: "Chick Peas", price: "260", img:menuImgs.foodImgs[23], type: "veg", id: "item_24" },
                    ],
                    KASHMIRI_COMFORT: [
                        { name: "Yakhni", price: "799", img:menuImgs.foodImgs[24], type: "non_veg", id: "item_25" },
                        { name: "Chicken Korma", price: "499", img:menuImgs.foodImgs[25], type: "non_veg", id: "item_26" },
                        { name: "Tabak Maaz", price: "699", img:menuImgs.foodImgs[26], type: "non_veg", id: "item_27" },
                        { name: "Roagn-Josh", price: "499", img:menuImgs.foodImgs[27], type: "non_veg", id: "item_28" },
                    ],
                    DESSERT: [
                        { name: "Chilled Mango Pomelo Sago", price: "199", img:menuImgs.foodImgs[28], type: "veg", id: "item_29" },
                        { name: "Seasonal Sliced Fruit", price: "150", img:menuImgs.foodImgs[29], type: "veg", id: "item_30" },
                        { name: "Häagen-Dazs (ice cream)", price: "179", img:menuImgs.foodImgs[30], type: "veg", id: "item_31" },
                        { name: "Profiterole", price: "260", img:menuImgs.foodImgs[31], type: "veg", id: "item_32" },
                    ]
                },
                discountLogo:menuImgs.discountLogo
            },
            cart:cartImgs,
            checkout:checkoutImgs
        });

        await Data.save();
        console.log('HomePage data saved successfully!');
    } catch (error) {
        console.error('Error populating data:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDB()