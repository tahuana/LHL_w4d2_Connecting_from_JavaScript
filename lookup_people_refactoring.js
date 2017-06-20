const find = process.argv[2];

const pg = require("pg");
const settings = require("./settings"); //setting.json

const client = new pg.Client({
  user      : settings.user,
  password  : settings.password,
  database  : settings.database,
  host      : settings.hostname,
  port      : settings.port,
  ssl       : settings.ssl
});

const buildResponse = (err, result) => {
  if (err) {
      return console.error("error running query", err);
    }
    // console.log("res: ", result);
    console.log(`Found ${result.rows.length} person(s) by the name '${find}':`)
    for (let i in result.rows){
      let date = result.rows[i].birthdate.toISOString().substring(0, 10);
      console.log(`- ${i}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${date}'`);
    }
};

const buildQuery = () => {
  let q = `SELECT *
            FROM famous_people
            WHERE
              UPPER(first_name) like UPPER($1::text)
                OR
              UPPER(last_name) like UPPER($1::text);`
  return q;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  client.query(buildQuery(), [find], (err, result) => {
    buildResponse(err, result);
    client.end();
  });

});


