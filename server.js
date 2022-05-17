/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import fileUpload from "express-fileupload";

import router from "./routes/index.js";
import { PORT } from "./config/index.js";
/* -------------------------------------------------------------------------- */
/*                               EXPRESS CONFIG                               */
/*                                MIDDLEWARES                                 */
/* -------------------------------------------------------------------------- */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(router);

/* -------------------------------------------------------------------------- */
/*                                   LISTENING                                */
/* -------------------------------------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
