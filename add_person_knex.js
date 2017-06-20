const first_name = process.argv[2];
const last_name = process.argv[3];
const birth_date = process.argv[4];


const settings = require("./settings_knex"); //setting_knex.json
const knex = require("knex")(settings);


const insertData = () =>{

  let q = knex('famous_people').insert({'first_name': first_name, 'last_name': last_name, 'birthdate': birth_date})

  q.asCallback(function(err, values) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successful insert!");
    }
    knex.destroy();
  });
}

insertData();

