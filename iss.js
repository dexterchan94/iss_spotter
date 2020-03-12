const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // console.log("statusCode:", response.statusCode);
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const URL = "https://ipvigilante.com/" + ip;
  request(URL, (error, response, body) => {
    // console.log("statusCode:", response.statusCode);
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates: ${body}`), null);
      return;
    }

    const coords = { latitude: "", longitude: "" };
    coords.latitude = JSON.parse(body).data.latitude;
    coords.longitude = JSON.parse(body).data.longitude;
    callback(null, coords);

  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const URL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(URL, (error, response, body) => {
    // console.log("statusCode:", response.statusCode);
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching flyover times: ${body}`), null);
      return;
    }

    const times = JSON.parse(body)["response"];
    callback(null, times);

  });
};

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("It didn't work! Error: ", error);
      }
      
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          console.log("It didn't work! Error: ", error);
        }
        
        for (time of times) {
          let date = new Date(time.risetime * 1000);
          let localString = date.toLocaleString("en-US", {timeZone: "America/Vancouver", timeZoneName: "short"});
          console.log(`Next pass at ${localString} for ${time.duration} seconds!`);
        } 
      });

    });

  });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};