const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routers = require('./routes/index.js');
const cors = require('cors');
const { google } = require("googleapis");

const PORT = 3001;
const app = express();
app.set("view engine", "ejs");

mongoose.connect('mongodb+srv://IvanPlisyakov:actiVision12@cluster-mesto.ndo6c.mongodb.net/movies?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
})
  .then(() => console.log('mongo connected'))
  .catch((err) => {console.log(err)});
/*mongoose.connect('mongodb://localhost:27017/quest', {//process.env.DATABASE_URL
  useUnifiedTopology: true,
  useNewUrlParser: true,

});*/

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
//app.use(bodyParser.json());
app.use('/', routers);
/*app.get('/api', async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1fML6QIdeoMr5a6owXPVaAhiGCNOfrqJvp4Eiw6cyIRs";

  // Get metadata about spreadsheet
  //const metaData = await googleSheets.spreadsheets.get({
  //auth,
  // spreadsheetId,
  //});

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!B:B",
  });

  res.status(200).send({quantity: getRows.data.values[0][0], data: getRows.data.values.slice(1)});

})*/

app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
}) 