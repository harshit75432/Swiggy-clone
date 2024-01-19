let Location = require('../models/location')



async function getLocationsAsObject(){
    let locationsAsObject = {}

 
    let locations = await Location.find().sort({name: 1}).exec();
    for (let i=0; i<locations.length;i++){
        locationsAsObject[locations[i].id]= locations[i].name
    }

   return locationsAsObject
   
}


let helper = {
    getLocationsAsObject
}

module.exports = helper