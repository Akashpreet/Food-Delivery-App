const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://akash123:qd8JaAK1eIVSzT48@cluster0.4jh1kdn.mongodb.net/foodapp?retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURL, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("There is problem", err)
        else {
            console.log("Connected Successfully");
            const fetch_data = await mongoose.connection.db.collection("food_items");
            fetch_data.find({}).toArray(async function (err, data) {
                const foodCatagory = await mongoose.connection.db.collection("foodCatagory");
                foodCatagory.find({}).toArray(function (err, catData){
                    if (err) {
                        console.log(err);
                    }
                    else {
                        global.food_items = data;
                        global.foodCatagory=catData;
                    }
                })
                // if(err){
                //     console.log(err);
                // }
                // else{
                //     global.food_items=data;
                //     console.log(global.food_items);
                // }
            })
        }
    });
}
module.exports = mongoDB;