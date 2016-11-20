export default {
  //Server configuration
  DB_URL: process.env.AWIMARKET_DB_URL || process.env.AWIMarket_DB_URL,
  DB_TEST_URL: process.env.AWIMARKET_DB_TEST_URL,
  PORT: process.env.AWIMARKET_PORT || process.env.PORT || 3010,

  S3_ACCESS_KEY_ID: process.env.AWIMARKET_S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.AWIMARKET_S3_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.AWIMARKET_S3_BUCKET || "awimarket-upload",
  S3_IMAGE_FOLDER: process.env.AWIMARKET_S3_IMAGE_FOLDER || "images",
  S3_BASE_URL: process.env.AWIMARKET_S3_BASE_URL || "https://s3-eu-west-1.amazonaws.com/",

  //Client configuration
  API_BASE_URL: process.env.AWIMARKET_API_BASE_URL || "http://localhost:3010/api",


}
