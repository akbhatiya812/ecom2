const mongoose = require("mongoose");
const URL = process.env.MONGOOSE_URL;


mongoose.connect(URL).then(()=> {
  // console.log("MongoDb connected successfully");
}).catch(err => {
  console.log(err);
})