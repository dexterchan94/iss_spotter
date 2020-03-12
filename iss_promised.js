const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};


const fetchCoordsByIP = (body) => {
  const IP = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${IP}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(printPassTimes)
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
};

const printPassTimes = (body) => {
  const { response } = JSON.parse(body);
  for (time of response) {
    let date = new Date(time.risetime * 1000);
    let localString = date.toLocaleString("en-US", {timeZone: "America/Vancouver", timeZoneName: "short"});
    console.log(`Next pass at ${localString} for ${time.duration} seconds!`);
  }
};

module.exports = {
  nextISSTimesForMyLocation,
}