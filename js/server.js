let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;


const client = new MongoClient ("mongodb+srv://Afanador:semuel89@cluster0.isspoe4.mongodb.net/usersGame?retryWrites=true&w=majority");

const starts = async () => {
    try {
        await client.connect();
        console.log("Good")
    } catch(e) {
        console.log(e);
    }
}
starts()