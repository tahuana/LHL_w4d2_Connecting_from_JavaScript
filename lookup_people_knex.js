const find = process.argv[2];

const settings = require("./settings_knex"); //setting_knex.json
const knex = require("knex")(settings);


const buildResponse = (result) => {

  // console.log("res: ", result);
  console.log(`Found ${result.length} person(s) by the name '${find}':`)
  for (let i in result){
    let date = result[i].birthdate.toISOString().substring(0, 10);
    console.log(`- ${i}: ${result[i].first_name} ${result[i].last_name}, born '${date}'`);
  };
}


// knex.select().from("famous_people").asCallback(function(err, values) {
const searchQuery = () =>{

  let q = knex('famous_people').where('first_name', 'like', find).orWhere('last_name', 'like', find)

  q.asCallback(function(err, values) {
    if(err) {
      console.log(err);
    } else {
      buildResponse(values);
    }
    knex.destroy();
  });
}

searchQuery();

