const mongoose = require('mongoose');
const MONGOURI = "mongodb+srv://FastFood:fastfood123@cluster0.j3nu1aw.mongodb.net/FastFood?retryWrites=true&w=majority"


mongoose.set("strictQuery",false)
const mongoDB =async(URI) =>{
    await mongoose.connect(URI,{useNewUrlParser:true},(err,result)=>{
        if(err){
            console.log(".......",err)
            // console.log("hello");
        }
        else{
            console.log("connected");
            const fetched_data = mongoose.connection.db.collection("foodItems");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory = await mongoose.connection.db.collection("foodCategary");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err) console.log(err);
                    else{
                        global.fooditems = data;
                        global.foodCategory = catData;
                    }
                })
            })
        }
        
    })
}

module.exports = mongoDB;


