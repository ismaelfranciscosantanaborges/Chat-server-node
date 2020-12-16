const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex: true
        })

        console.log('BD Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error in the database in the cloud');
    }
}

module.exports = { dbConnection };