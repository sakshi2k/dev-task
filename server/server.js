const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const session = require("express-session");


const db = require('./db.js')
const routes = require('./routes');
const authRoutes = require('./routes/authRoutes.js');

const PORT = process.env.NODE_ENV|| 3000

app.use(bodyParser.json());
// app.use(session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {secure: true,
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));


app.use('/auth', authRoutes);
app.use('/api', routes);


// Listening to the server
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
    console.log(process.env.NODE_ENV)
    // console.log(app.session)
    db.connectDb()
});