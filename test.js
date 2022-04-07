// import jwt_decode from "jwt-decode";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNDRjOWQyOGYtYjE4Ny00ZDE2LWJiMWYtNzM5Y2E1MmQ3OGRlIiwiaWF0IjoxNjQ4MDIxOTIzLCJleHAiOjE2NDgyODExMjN9.eCyO67CB8-xgBTDWv9HkKx0flo3_SuzTAnm4pWbSN9E";
// var decoded = jwt_decode(token);
// console.log(decoded);
const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
let stream = fs.createReadStream("test.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function (data) {
    csvData.push(data);
  })
  .on("end", function () {
    // remove the first line: header
    csvData.shift();
    // create a new connection to the database
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "attendance",
      password: "1930",
      port: 5432,
    });
    const query =
      "INSERT INTO category (id, name, description, created_at) VALUES ($1, $2, $3, $4)";
    pool.connect((err, client, done) => {
      if (err) throw err;
      try {
        csvData.forEach((row) => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });
stream.pipe(csvStream);
