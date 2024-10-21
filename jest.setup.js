const dotenv = require("dotenv");
const env = process.env.NODE_ENV || "test"; // Default to 'test'

if (env === "test") {
    dotenv.config({ path: ".env.test.local" });
} else {
    dotenv.config();
}
