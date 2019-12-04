const path = require("path");
const express = require("express");
//το βαλαμε 49 video  advanced templating
const hbs = require("hbs");
//1-καλεσμα geocode video 55
const geocode = require("./utils/geocode");
//1-καλεσμα forecast video 55
const forecast = require("./utils/forecast");

//console.log(__dirname);

//generate the path to the sttic folder
//console.log(path.join(__dirname, "../public"));

const app = express();
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

/* //dynamic templates -- We have a key.The setting name and we have a value.The value we want to set for the setting in our case to set up a view engine like express the value */
//view engine ειναι το setting που χρησιμοποιηουμε και το hbs αυτο που καναμε install
//setup handlerbars engine and views location
app.set("view engine", "hbs");
//για να δει τα αρχεια hbs που εχουμε στο templates
app.set("views", viewsPath);

/* //Now we actually use HB S. here HB S. registerPartials takes a path to the directory.where your partials live. */
hbs.registerPartials(partialsPath);

/* //We are going to call express dot static so express dot static is a function.Now static takes the path to the folder. */
//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//send hbs -- στελνει το index
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Andrew Mead"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "panagiotis"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "iam malakas",
    title: "helppppp",
    name: "panagiotis"
  });
});

/* The first is an object containing information about the incoming request to the server. -request = req */
/* THE SECOND So this contains a bunch of methods allowing us to customize what we're going to send back to the requester -response = res */
/* app.get("", (req, res) => {
  res.send("<h1>malaka</h1>");
}); */

//στελνει array kai object οπυ η express το καταλαβαινει και το κανει σε json
/* app.get("/help", (req, res) => {
  res.send([
    {
      name: "panos"
    },
    {
      name: "sarah"
    }
  ]);
}); */

/* app.get("/about", (req, res) => {
  res.send("<h1>about page</h1>");
}); */

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide a address term"
    });
  }
  /* //αν μπει χωρις αυτο = {} τοτε αμα βαλεις κατι ακυρο στο search πχ ! τοτε βγαζει error με αυτο σ εμφανιζει το σωστο μηνυμα και δεν βγαζει error.ΔΗΛΑΔΗ κανει search=! βλεπει καλει την error αλλα επειδη η { latitude, longitude, location } ειναι με destructuring εμφανιζει error οποτε με αυτον τον τροπο δουλευει σωστα video 56 */
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          //error :error
          error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );

  /* console.log(req.query.address);
  res.send({
    location: "Greece",
    forecast: "its cold",
    address: req.query.address
  }); */
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term"
    });
  }
  console.log(req.query.search);

  res.send({
    products: []
  });
});

// app.com
// app.com/help
// app.com/about

//START the server
/* //This starts up this server and it has it Listen.On a specific port for the moment we're gonna use a common development port which is port three thousand. */
//common developer port is 3000

app.get("/help/*", (req, res) => {
  //res.send("help article not found");
  res.render("404", {
    title: "404",
    name: "panagiotis",
    errorMessage: "help article not found"
  });
});

//404 error page
app.get("*", (req, res) => {
  //res.send("My 404 page");
  res.render("404", {
    title: "404",
    name: "panagiotis",
    errorMessage: "page not found"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
