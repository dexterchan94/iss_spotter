const { fetchMyIP, fetchCoordsByIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Return IP:", ip);
// });


// fetchCoordsByIP("162.245.144.188", (error, data) => {
//   if (error) {
//     console.log("It didn't work! Error: ", error);
//   }
  
//   console.log(data);
// });