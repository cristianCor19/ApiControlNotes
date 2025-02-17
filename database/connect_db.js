import mongoose from "mongoose";

// method for the connect the database
const connectToDatabase = async() => {
    try {
        await mongoose.connect(process.env.URLMONGO)
        console.log('Sucessfully connected to dababase');
    } catch (error) {
        console.log('error connect to the dabatabase' + error);
    }

}

export default connectToDatabase;