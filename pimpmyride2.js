class Trip {
   constructor(name, start, duration, price) {
      this.client = name
      this.start = start
      this.duration = duration
      this.price = price
      this.end = start + duration
   }

   isCompatible(trip) {
      if (trip.start > this.end) return true;
      return false;
   }
}

function parseTrip(trip) {
  const arr = trip.split(" ");
  return new Trip(arr[0], parseInt(arr[1]), parseInt(arr[2]), parseInt(arr[3]))
}

function parseTrips(tripsToParse) {
  let res = [];

  tripsToParse.forEach((trip) => {
    res.push(parseTrip(trip));
  });

  return res;
}

function findCompatibilities(trips) {
  let res = [];

  trips.forEach((trip) => res.push([trip]));

  for (let i = 0; i < trips.length; i++) {
    for (let j = i + 1; j < trips.length; j++) {
      if (trips[i].isCompatible(trips[j])) {
        res.push([trips[i], trips[j]]);
      }
    }
  }
  return res;
}

function getTripsPrice(tripsList) {
  let sum = 0;
  tripsList.forEach((trip) => (sum += trip.price));
  return sum;
}


function findBestPrice(trips) {
  const parsedTrips = parseTrips(trips);
  const allCompatibleTrips = findCompatibilities(parsedTrips);
  let bestPrice = 0;
  let indexBestPrice = 0;

  for (let i = 0; i < allCompatibleTrips.length; i++) {
    const tripPrice = getTripsPrice(allCompatibleTrips[i]);
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
const parsedTrips = parseTrips(tripsToParse);
const twoTrips = [
  { client: "Roger", start: 0, duration: 5, price: 10 },
  { client: "Pongo", start: 3, duration: 7, price: 13 },
];

/************************************************************************************************************************/

/*console.log(parsedTrips);
console.log(`${parsedTrips[0].client} end: ${parsedTrips[0].end}, ${parsedTrips[1].client} start: ${parsedTrips[1].start}`)
console.log(parsedTrips[0].isCompatible(parsedTrips[1]));
console.log(findCompatibilities(parsedTrips));
console.log(getTripsPrice(twoTrips));
*/

console.log(findBestPrice(tripsToParse));
