const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: 'doiirtrja', 
  api_key: '196728763112872', 
  api_secret: 'DNBsSp8zo1du6GsXtw7ZoOxHfZc' 
});

module.exports= cloudinary