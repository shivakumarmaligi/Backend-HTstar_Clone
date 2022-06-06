const express = require("express");
const app = express();

const { NODE_ENV, PORT } = require("./config");
const { CloudDBConnection } = require("./config/db");

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const { success, error } = require("consola");
const { storage } = require("./helpers/AuthValidate");

const AuthRoute = require("./routes/auth");


let StartServer = async () => {
    try {
      /*======= Cloud DataBase Connection Starts Here =========*/
      CloudDBConnection();
      /*======= Cloud DataBase Connection Ends Here ==========*/

      /* ========= Middleware Section Starts Here ========== */
      app.use(express.json());
      app.use(cors());
      app.use(cookieParser());
      /* ========= Middleware Section Ends Here =========== */

      /* ======= Load Routes Block Starts Here ========== */
      app.use("/api/auth", AuthRoute);
      /* ======= Load Routes Block Ends Here ========== */
      /* ======== Listen PORT Starts Here ======== */
      app.listen(PORT, err => {
        if (err) {
          error(`${err}`.red.bold);
        } else {
          success(`Server is Listening to the Port:${PORT} `.green.bold);
        }
      });
      /* ======== Listen PORT Ends Here ========= */
    } catch (err) {
        error(`${err}`.red.bold);
    }
};

StartServer();
