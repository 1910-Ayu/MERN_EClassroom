const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
        });

        console.log(`Mongodb Connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit();
    }
}

module.exports = connectDB;