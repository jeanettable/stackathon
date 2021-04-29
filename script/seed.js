const { v4: uuid } = require('uuid');
const {db, User, Event, List } = require('../server/db')

const users = [
  {
    id: 1,
    email: 'jeanette@test.io',
    password: 'jeanettepw',
    isProduction: true,
    last: 'Abell',
    first: 'Jeanette',
  },
  {
    id: 2,
    email: 'ashley@test.io',
    password: 'ashleypw',
    isProduction: true,
    last: 'Marinelli',
    first: 'Ashley',
  },
  {
    id: 3,
    email: 'greer@test.io',
    password: 'greerpw',
    isProduction: true,
    last: 'Gisy',
    first: 'Greer',
  },
  {
    id: 4,
    email: 'sam@test.io',
    password: 'sampw123',
    isProduction: false,
    last: 'Jam',
    first: 'Samantha',
  },
  { id: 5, 
    email: 'natalie@test.io',
    password: 'nataliepw',
    isProduction: false,
    last: 'Williams',
    first: 'Natalie',
  },
  {
    id: 6, 
    email: 'larry@test.io',
    password: 'larrypw',
    isProduction: true,
    last: 'Lozier',
    first: 'Larry',
  },
  {
    id: 7,
    email: 'dion@test.io',
    password: 'dionpw123',
    isProduction: false,
    last: 'James',
    first: 'Dion',
  },
  {
    id: 8,
    email: 'benny@test.io',
    password: 'bennypw',
    isProduction: false,
    last: 'Benny',
    first: 'Jones',
  },
  {
    id: 9,
    email: 'jeanette2@test.io',
    password: 'jeanettepw',
    isProduction: false,
    last: 'Abell',
    first: 'Jeanette',
  },
  { id: 10,
    email: 'olivia@test.io',
    password: 'oliviapw',
    isProduction: false,
    last: 'Olivia',
    first: 'Amato',
  },
];

const events = [
  {
    title: 'Fall of The House Lab - Female Dancers',
    callType: 'open call',
    eventDate: '2021-07-06',
    eventTime: '09:30',
    jobDuration: 'August 2021 - October 2021',
    description: 'About: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Requirements: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Volutpat blandit aliquam etiam erat velit scelerisque. Metus dictum at tempor commodo ullamcorper a. Fusce ut placerat orci nulla.',
    contractType: 'Off Broadway',
    productionCo: 'Marinelli Moving Pictures',
    jobLocation: 'Salt Lake City, UT',
    userId: 1
  },
  {
    title: 'Fall of The House Lab - Male Actors',
    callType: 'open call',
    eventDate: '2021-07-06',
    eventTime: '13:30',
    jobDuration: 'August 2021 - October 2021',
    description: 'About: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Requirements: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Volutpat blandit aliquam etiam erat velit scelerisque. Metus dictum at tempor commodo ullamcorper a. Fusce ut placerat orci nulla.',
    contractType: 'Off Broadway',
    productionCo: 'Marinelli Moving Pictures',
    jobLocation: 'Salt Lake City, UT',
    userId: 1
  },
  {
    title: 'Music Man - Ensemble Dancers',
    callType: 'EPA',
    eventDate: '2021-05-28',
    eventTime: '10:00',
    jobDuration: 'Summer 2021',
    description: 'About: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Preparation: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Other: Ultrices neque ornare aenean euismod elementum nisi quis eleifend. Volutpat blandit aliquam etiam erat velit scelerisque. Metus dictum at tempor commodo ullamcorper a. Fusce ut placerat orci nulla.',
    contractType: 'LORT',
    productionCo: 'Blythe Center for Arts & Humanities',
    jobLocation: 'Blythe, TX',
    userId: 5
  },
  {
    title: 'Hamilton - Dancers',
    callType: 'ECC',
    eventDate: '2021-08-04',
    eventTime: '10:30',
    jobDuration: '2022 seasonal contract',
    description: 'About: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Preparation: Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Egestas dui id ornare arcu odio. Arcu non odio euismod lacinia at quis risus sed. Ut venenatis tellus in metus vulputate. Quis risus sed vulputate odio ut enim blandit volutpat. Diam vulputate ut pharetra sit amet aliquam. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus.',
    contractType: 'Broadway',
    productionCo: 'Andrew Femenella & Associates',
    jobLocation: 'New York, NY', 
    userId: 2
  },
]

 const seed = async () => {
  try {
    await db.sync( { force: true } );

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    await Promise.all(
      events.map((event) => {
        return Event.create(event);
      })
    );

    // PRINTS OBJECTS TO CONSOLE:
    // console.log('allUsers>>> ', allUsers);
    // console.log('allEvents>>> ', allEvents);

  } catch (err) {
    console.log(err);
  }
};


// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.error('Uh oh! Something went wrong!');
      console.error(err);
      db.close();
    });
}

