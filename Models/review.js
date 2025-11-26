const mongoose = require("mongoose");
const {Schema} = mongoose;

// main()
//     .then(() => {console.log('CONNECTION SUCCESSFULL')})
//     .catch(()=>{console.log("ERROR OCCURED")});

// async function main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

const reviewSchema = new Schema({
    comment:String,
    rating:{
        type: Number,
        min:1,
        max:5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

module.exports = mongoose.model("Review",reviewSchema);