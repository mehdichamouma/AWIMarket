export default {
  //Server configuration
  DB_URL: process.env.AWIMARKET_DB_URL || process.env.AWIMarket_DB_URL,
  DB_TEST_URL: process.env.AWIMARKET_DB_TEST_URL,
  PORT: process.env.AWIMARKET_PORT || process.env.PORT || 3010,


  //Client configuration
  API_BASE_URL: process.env.AWIMARKET_API_BASE_URL || "http://localhost:3010/api",
}
