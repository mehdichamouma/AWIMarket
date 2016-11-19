import populateDb from "../app/utils/populateDb"
import config from "../config"

console.log("DATABASE INITIALIZATION");
console.log("----------");
console.log();

populateDb(config.DB_URL, true)
.then(() => {
  console.log();
  console.log("----------");
  console.log("DATABASE INITIALIZED");
})
