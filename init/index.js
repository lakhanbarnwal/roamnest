const mongoose = require("mongoose")
const Data = require("./data.js")
const Listing = require("../models/listing.js")

main()
  .then(() => console.log("Databse connected!"))
  .catch((err) => console.log(err));

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDB = async ()=>{
    await Listing.deleteMany();

    Data.data = Data.data.map((obj)=>({...obj,owner:"6a4c7ae67762e30c85778f4a"}))
    await Listing.insertMany(Data.data);
    console.log("data was initialised")
}

initDB();