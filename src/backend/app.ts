
import { ProvisionalCreateCanisterWithCyclesArgs } from "azle/canisters/management";
import {
  query,
  update,
  text,
  Record,
  StableBTreeMap,
  Variant,
  Vec,
  Ok,
  Err,
  ic,
  Principal,
  Opt,
  nat64,
  Result,
  blob,
  bool,
  Canister,
  init,
  Void,
  nat,
  Some,
  None
  // Duration
} from "azle/experimental";
import { v4 as uuidv4 } from "uuid";


const User = Record({
  userId: text,
  name: text,
  email: text,
  phone: text,
  applications: Vec(text),
});
type User = typeof User.tsType;
const UserPayload = Record({
  name: text,
  email: text,
  phone: text,
});


type UserPayload = typeof UserPayload.tsType;

const Activity = Record({
  activityId: text,
  activityName: text,
  price: nat,
  location: text,
  duration: text,
  participants: Vec(text),
  reviews: Vec(text),
});

type Activity = typeof Activity.tsType;

const ActivityPayload = Record({
  activityName: text,
  price: nat,
  location: text,
  duration: text,
});
type ActivityPayload = typeof ActivityPayload.tsType;

const Hotels = Record({
  hotelId: text,
  name: text,
  location: text,
  typeOfRoom: text,
  availableRooms: nat,
  amenities: text,
  price: nat,
  numberofRooms: nat,
  rating: nat,
  description: text,
  guests: Vec(text),
  reviews: Vec(text),
});

type Hotels = typeof Hotels.tsType;

const HotelsPayload = Record({
  name: text,
  location: text,
  typeOfRoom: text,
  availableRooms: nat,
  amenities: text,
  price: nat,
  numberofRooms: nat,
  rating: nat,
  description: text,
});

type HotelsPayload = typeof HotelsPayload.tsType;

const Flight = Record({
  flightId: text,
  destination: text,
  depatureTime: text,
  arrivalTime: text,
  price: nat,
  rating: nat,
  flightClass: text,
  availableSeats: nat,
  passengers: Vec(text),
});

type Flight = typeof Flight.tsType;

const FlightPayload = Record({
  destination: text,
  depatureTime: text,
  arrivalTime: text,
  price: nat,
  rating: nat,
  flightClass: text,
  availableSeats: nat,
});

type FlightPayload = typeof FlightPayload.tsType;

const BookActivity = Record({
  activityId: text,
  userName: text,
  userPhoneNumber: text,
  date: text,
  numberOfPeople: nat,
});

type BookActivity = typeof BookActivity.tsType;

const BookActivityPayload = Record({
  activityId: text,
  userName: text,
  userPhoneNumber: text,
  date: text,
  numberOfPeople: nat,
});

type BookActivityPayload = typeof BookActivityPayload.tsType;

const RoomTypes = Variant({
  Single: text,
  Double: text,
  Suite: text,
  Deluxe: text,
  Family: text,
  Business: text,
  Honeymoon: text,
  Executive: text,
  Presidential: text,
});

type RoomTypes = typeof RoomTypes.tsType;

const BookHotel = Record({
  hotelId: text,
  userName: text,

  numberOfRooms: nat,
  duration: nat,
  typeOfRoom: text,
});

type BookHotel = typeof BookHotel.tsType;

const BookHotelPayload = Record({
  hotelId: text,
  userName: text,

  numberOfRooms: nat,
  duration: nat,
  typeOfRoom: text,
});

type BookHotelPayload = typeof BookHotelPayload.tsType;

const FlightClass = Variant({
  Economy: text,
  Business: text,
  First: text,
});

type FlightClass = typeof FlightClass.tsType;



const Reviews = Record({
  reviewId: text,
  userId: text,
  hotelId: text,
  flightId: text,
  activityId: text,
  review: text,
  rating: nat,
});

type Reviews = typeof Reviews.tsType;

const ReviewsPayload = Record({
  userId: text,
  hotelId: text,
  flightId: text,
  activityId: text,
  review: text,
  rating: nat,
});

type ReviewsPayload = typeof ReviewsPayload.tsType;

const Ticket = Record({
  ticketId: text,
  userName: text,
  flightId: text,
  flightClass: text,
  numberOfSeats: nat,
});

type Ticket = typeof Ticket.tsType;

const TicketPayload = Record({
  userName: text,
  flightId: text,
  flightClass: text,
  numberOfSeats: nat,
});

type TicketPayload = typeof TicketPayload.tsType;

const Message = Variant({
  NotFound: text,
  Success: text,
  Error: text,
  NotAllowed: text,
});

type Message = typeof Message.tsType;

const UserStorage = StableBTreeMap<text, User>(0);
const ActivityStorage = StableBTreeMap<text, Activity>(1);
const HotelsStorage = StableBTreeMap<text, Hotels>(2);
const FlightStorage = StableBTreeMap<text, Flight>(3);
//const BookingStorage = StableBTreeMap<text, Booking>(4);
const TicketStorage = StableBTreeMap<text, Ticket>(4);

const ReviewsStorage = StableBTreeMap<text, Reviews>(5);

export default Canister({
  //user
  //add user
  addUser: update([UserPayload], Result(Vec(User), Message), (payload) => {
    const userId = uuidv4();
    const user = { userId, ...payload, applications: [] };
    UserStorage.insert(userId, user);
    return Ok([user]);
  }),

  //get user
  getUser: query([text], Result(User, Message), (id) => {
    const user = UserStorage.get(id);
    return user ? Ok(user) : Err("User not found");
  }),

  //get users
  getUsers: query([], Vec(User), () => {
    return UserStorage.values();
  }),

  //add activity
  addActivity: update(
    [ActivityPayload],
    Result(Activity, Message),
    (payload) => {
      const activityId = uuidv4();
      const timestamp = ic.time();
      const activity = {
        activityId,
        timestamp,
       
        participants: [],
        reviews: [],
        ...payload,
      };
      ActivityStorage.insert(activityId, activity);
      return Ok(activity);
    }
  ),

  //get activities
  getActivities: query([], Vec(Activity), () => {
    return ActivityStorage.values();
  }),

  //get activity
  getActivity: query([text], Result(Activity, Message), (id) => {
    const activity = ActivityStorage.get(id);
    return activity ? Ok(activity) : Err("Activity not found");
  }),

  //get list of users who have booked an activity
  getActivityParticipants: query([text], Vec(text), (id) => {
    const activity = ActivityStorage.get(id);
    return activity ? activity.participants : [];
  }),

  //add hotel
  addHotel: update([HotelsPayload], Result(Vec(Hotels), Message), (payload) => {
    const hotelId = uuidv4();
    const hotel = { hotelId, guests: [], reviews: [], ...payload };
    HotelsStorage.insert(hotelId, hotel);
    return Ok([hotel]);
  }),

  //get hotels
  getHotels: query([], Vec(Hotels), () => {
    return HotelsStorage.values();
  }),

  //get hotel
  getHotel: query([text], Result(Hotels, Message), (id) => {
    const hotel = HotelsStorage.get(id);
    return hotel ? Ok(hotel) : Err("Hotel not found");
  }),

  //add flight
  addFlight: update(
    [FlightPayload],
    Result(Vec(Flight), Message),
    (payload) => {
      const flightId = uuidv4();
      const flight = { flightId, passengers: [], ...payload };
      FlightStorage.insert(flightId, flight);
      return Ok([flight]);
    }
  ),

  //get flights
  getFlights: query([], Vec(Flight), () => {
    return FlightStorage.values();
  }),

  //get flight
  getFlight: query([text], Result(Flight, Message), (id) => {
    const flight = FlightStorage.get(id);
    return flight ? Ok(flight) : Err("Flight not found");
  }),

  //get available flights
  getAvailableFlights: query([], Vec(Flight), () => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.availableSeats > 0);
  }),

  //booking

  //book activity
  bookActivity: update(
    [BookActivityPayload],
    Result(Vec(Activity), Message),
    (payload) => {
      const activityOpt = ActivityStorage.get(payload.activityId);
      if (!activityOpt) {
        return Err("Activity not found");
      }
      const { activityId, numberOfPeople } = payload;
      

      const activity = activityOpt;
      activity.participants.push(payload.userName);
      // activity.duration -= 1;
      ActivityStorage.insert(activityId, activity);
      return Ok([activity]);
    }
  ),

  //book hotel
  bookHotel: update(
    [BookHotelPayload],
    Result(Vec(Hotels), Message),
    (payload) => {
      const hotel = HotelsStorage.get(payload.hotelId);
      if (!hotel) {
        return Err("Hotel not found");
      }
      const { hotelId, numberOfRooms } = payload;

      if (hotel.availableRooms < numberOfRooms) {
        return Err("Not enough rooms available");
      }
      hotel.availableRooms -= numberOfRooms;
      HotelsStorage.insert(hotelId, hotel);
      hotel.guests.push(payload.userName);

      return Ok([hotel]);
    }
  ),

  //book flight


  //book flight and send ticket to passengers
   bookFlight: update([TicketPayload], Result(Ticket, Message), (payload) => {
     const flightOpt = FlightStorage.get(payload.flightId);
     if (!flightOpt) {
       return Err("Flight not found");
     }
     const { flightId, numberOfSeats } = payload;
     flightOpt.availableSeats -= numberOfSeats;
     const flight = flightOpt;
     const ticketId = uuidv4();
     const ticket = { ticketId, ...payload };
     FlightStorage.insert(flightId, flightOpt);
     TicketStorage.insert(ticketId, ticket);
     //push ticket to flightStorage passengers
     flight.passengers.push(ticket.ticketId);

     return Ok(ticket);
   }),

  //get ticket
  getTicket: query([text], Result(Ticket, Message), (id) => {
    const ticket = TicketStorage.get(id);
    return ticket ? Ok(ticket) : Err("Ticket not found");
  }),

  //get tickets
  getTickets: query([], Vec(Ticket), () => {
    return TicketStorage.values();
  }),

  //get ticket by flightid
  getTicketByFlightId: query([text], Vec(Ticket), (flightId) => {
    const tickets = TicketStorage.values();
    return tickets.filter((ticket) => ticket.flightId === flightId);
  }),

  //search for flights based on destination
  searchFlights: query([text], Vec(Flight), (destination) => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.destination === destination);
  }),

  //search for hotels based on location
  searchHotels: query([text], Vec(Hotels), (location) => {
    const hotels = HotelsStorage.values();
    return hotels.filter((hotel) => hotel.location === location);
  }),

  //search for activities based on location
  searchActivities: query([text], Vec(Activity), (location) => {
    const activities = ActivityStorage.values();
    return activities.filter((activity) => activity.location === location);
  }),

  //search for activities based on price
   

  

  //search for hotels based on price
  searchHotelsByPrice: query([nat], Vec(Hotels), (price) => {
    const hotels = HotelsStorage.values();
    return hotels.filter((hotel) => hotel.price <= price);
  }),

  //search for flights based on price
  searchFlightsByPrice: query([nat], Vec(Flight), (price) => {
    const flights = FlightStorage.values();
    return flights.filter((flight) => flight.price <= price);
  }),

  //add review
  addReview: update(
    [ReviewsPayload],
    Result(Vec(Reviews), Message),
    (payload) => {
      const reviewId = uuidv4();
      const review = { reviewId, ...payload };
      ReviewsStorage.insert(reviewId, review);
      return Ok([review]);
    }
  ),

  //get reviews
  getReviews: query([], Vec(Reviews), () => {
    return ReviewsStorage.values();
  }),

  //get review
  getReview: query([text], Result(Reviews, Message), (id) => {
    const review = ReviewsStorage.get(id);
    return review ? Ok(review) : Err("Review not found");
  }),

  // //book service
  // bookService: update(
  //   [BookingPayload],
  //   Result(Vec(Booking), Message),
  //   (payload) => {

  //     const bookingId = uuidv4();
  //     const booking = { bookingId, ...payload };
  //     BookingStorage.insert(bookingId, booking);
  //    // ActivityStorage.insert(bookingId, booking);
  //     return Ok([booking]);
  //   }
  // ),
});

// const getCurrentDate = () => {
//   const timestamp = new Number(ic.time());
//   const date = new Date(timestamp.valueOf() / 1_000_000); // Convert from nanoseconds to milliseconds
//   return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
// };

// function getJobStatistics(jobPosts:any) {
//   // Initialize counters
//   let totalJobs = jobPosts.length;
//   let openJobs = 0;
//   let closedJobs = 0;
//   let industrySet = new Set();

//   // Loop through each job post and gather statistics
//   jobPosts.forEach((job:any) => {
//     // Count open and closed jobs based on status
//     if (job.status === 'open') {
//       openJobs++;
//     } else if (job.status === 'closed') {
//       closedJobs++;
//     }

//     // Add industry to the set (set automatically handles uniqueness)
//     industrySet.add(job.industry);
//   });

//   // Return the statistics as an object
//   return {
//     totalJobs: totalJobs,
//     openJobs: openJobs,
//     closedJobs: closedJobs,
//     totalIndustries: industrySet.size
//   };
// }
