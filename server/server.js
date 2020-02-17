const express = require("express");

// Help reading the input request body
const bodyParser = require("body-parser");

// store config variables in dotenv
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();
const api = require("./api/api");

// ****** allow cross-origin requests code START ****** //
app.use(cors()); // uncomment this to enable all CORS and delete cors(corsOptions) in below code
const allowedOrigins = process.env.allowedOrigins.split(",");
/**
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
 */
// ****** allow cross-origin requests code END ****** //

//Adding Minddleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", api);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.use("/", (req, res) => res.send("Welcome Unit Converter !"));
app.listen(process.env.PORT, () =>
  console.log("Unit Converter Server is ready on localhost:" + process.env.PORT)
);
