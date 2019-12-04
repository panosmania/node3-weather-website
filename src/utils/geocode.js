request = require("request");

/* //1. const geocode = (address, callback) => { μπαινει με address = greece ,ΜΕΤΑ μπαινει στο request  ελεγχει αν υπαρχει error αρχικα, αν υπαρχει καλει την callback και τις δινει ορισματα ενα κειμενο unable... και επειδη η callback με την σειρα της θα κανει call την (error, data) θελει κανονικα ακομα ενα ορισμα για το data η δεν βαζουμε κατι , το αφηνουμε κενο η βαζουμε το ιδιο αντιστοιχα γινεται και με το 
else if (response.body.features.length === 0) { ,ΜΕΤΑ ΠΑΜΕ ΣΤΗΝ ΠΕΡΙΠΤΩΣΗ ΠΟΥ ΟΛΑ ΕΙΝΑΙ ΟΚ else{callback(undefined,);} οπου εδω δεν εχει δεδομενα για το error (για αυτο undefined ) αλλα μονο για τo data*/
/* //encodeURIComponet(address) -- https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp */
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicGFub3NtYW5pYSIsImEiOiJjazNpcTMwaWswYTQyM25yNzFydDR0d3YzIn0.KSOdhGiBp_xJZ9XtSD-YQg&limit=1";

  //με destructuring video 39-40 εχει παραδειγμα
  //request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to mapbox service", undefined);
      //} else if (response.body.features.length === 0) {
    } else if (body.features.length === 0) {
      callback("unable to find location. try another search", undefined);
    } else {
      callback(undefined, {
        /* latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name */
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
