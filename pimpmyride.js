/*const userName = prompt("Quel est votre nom ?")

function bonjour() {
   alert(`Bonjour ${userName}!`);
}
*/

function parseTrip(trip) {
  const arr = trip.split(" ");
  return {
    client: arr[0],
    start: parseInt(arr[1]),
    duration: parseInt(arr[2]),
    price: parseInt(arr[3])
  };
}

function parseTrips(tripsToParse) {
  let res = [];

  tripsToParse.forEach((trip) => {
    res.push(parseTrip(trip));
  });

  return res;
}

function getTripsPrice(tripsList) {
  let sum = 0;
  tripsList.forEach((trip) => (sum += trip.price));
  return sum;
}

function checkCompatibility(tripA, tripB) {
  return tripA.start + tripA.duration - tripB.start < 0
}

function  findCompatibilities(trips) {
  let res = [];

  trips.forEach(trip => res.push([trip]));
  
  for (let i=0; i < trips.length; i++) {
    for (let j = i+1; j < trips.length; j++) {
      if (checkCompatibility(trips[i], trips[j])) {
        res.push([trips[i], trips[j]]);
      }
    }
  }
  return res;
}

function findBestPrice(trips) {
  const parsedTrips = parseTrips(trips);
  const allCompatibleTrips = findCompatibilities(parsedTrips);
  let bestPrice = 0;
  let indexBestPrice = 0;

  for (let i=0; i < allCompatibleTrips.length; i++) {
    const tripPrice = getTripsPrice(allCompatibleTrips[i])
    if (tripPrice > bestPrice) {
      bestPrice = tripPrice;
      indexBestPrice = i;
    }
  }

  return allCompatibleTrips[indexBestPrice];
}

/************************************************************************************************************************/

const tripToParse = "Perdita 8 10 8";
const tripsToParse = [
  "Roger 0 5 10",
  "Pongo 3 7 14",
  "Perdita 8 10 8",
  "Anita 16 3 7",
];
const allTrips = [
  { client: "Roger", start: 0, duration: 5, price: 10 },
  { client: "Pongo", start: 3, duration: 7, price: 14 },
];

/************************************************************************************************************************/

//console.log(parseTrip(tripToParse));
//console.log(parseTrips(tripsToParse));
//console.log(getTripsPrice(allTrips));

/*
console.log(
  checkCompatibility(
    { client: "Roger", start: 0, duration: 5, price: 10 },
    { client: "Pongo", start: 3, duration: 7, price: 14 }
  )
);

console.log(
  checkCompatibility(
    { client: "Roger", start: 0, duration: 5, price: 10 },
    { client: "Perdita", start: 7, duration: 10, price: 8 }
  )
);
*/

console.log(findCompatibilities(parseTrips(tripsToParse)));

console.log(findBestPrice(tripsToParse));