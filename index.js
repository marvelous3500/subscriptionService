const sequelize = require("./api/util/database");
const Plane = require("./models/plan");
const Subscription = require("./models/subscription");

Plane.hasMany(Subscription)

sequelize.sync().then( result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

// run this file with node index.js