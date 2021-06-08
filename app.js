const express = require("express");
const app = express();
const path = require("path");
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const dataBasePath = path.join(__dirname,"covid19India.db");
const dataBase= null;

const initializeDbAndServer = {
    try{
        db = await open({
            filename:dataBasePath,
            driver:sqlite3.Database
        })
        app.listen(3000,() =>{
            console.log("Server Running at http://localhost:3000/");
        })
    } catch(e){
        console.log(`DB Error:${e.message}`);
        process.exit(1);
    }
}
initializeDbAndServer();

const convertStateDbObjectToResponseObject = (dbObject) => {
    return {
        stateId: dbObject.state_id,
        stateName:dbObject.state_name,
        population:dbObject.population
    }
}
app.get("/states/", async (request, response) => {
  const getStatesQuery = `
    SELECT
      *
    FROM
      state;`;
  const statesArray = await database.all(getStatesQuery);
  response.send(
    statesArray.map((eachState) =>
      convertStateDbObjectToResponseObject(eachState)
    )
  );
});

module.exports = app;