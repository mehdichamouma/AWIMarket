import populateDb from "../app/utils/populateDb"

console.log("DATABASE INITIALIZATION");
console.log("----------");
console.log();

populateDb()
.then(() => {
  console.log();
  console.log("----------");
  console.log("DATABASE INITIALIZED");
})
