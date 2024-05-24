const dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: __dirname + '\\.env' })
let p = process.env;

const mongoose = require('mongoose');

mongoose.connect(
    `mongodb+srv://${p.MONGODB_USER}:${p.MONGODB_PASSWORD}@${p.MONGODB_HOST}/?retryWrites=true&w=majority&appName=${p.MONGODB_APPNAME}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));