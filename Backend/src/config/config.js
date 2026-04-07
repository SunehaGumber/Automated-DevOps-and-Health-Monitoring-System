import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URI) {
    console.log("MONGO_URI isn't defined in env.");
}
if (!process.env.EMAIL_USER) {
    console.log("EMAIL_USER isn't present in env file.")
}
if (!process.env.CLIENT_ID) {
    console.log("CLIENT_ID isn't defined in env.")
}
if (!process.env.CLIENT_SECRET) {
    console.log("CLIENT_SECRET isn't defined in env")
}
if (!process.env.REFRESH_TOKEN) {
    console.log("REFRESH_TOKEN isn't defined in env");
}
if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET isn't defined in env");
}
const config = {
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config;