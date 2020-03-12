const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    console.log("statusCode:", response.statusCode);
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

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};