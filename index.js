const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss");

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


// fetchISSFlyOverTimes({ latitude: "49.26200", longitude: "-123.09230" }, (error, data) => {
//   if (error) {
//     console.log("It didn't work! Error: ", error);
//   }

//   console.log(data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work! Error:", error);
  }

  console.log(passTimes);
});