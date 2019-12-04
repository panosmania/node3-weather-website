console.log("client side javascript file is loaded ");

/* We'll be using the very popular fetch API that is not part of JavaScript.

It is a browser based API which means it's something we can use in all modern browsers but it's not

accessible in node j s so the code we write inside of here isn't going to be something you'll be able */

/* παρε τα data απο fetch('http://puzzle.mead.io/puzzle'). και μετα τρεξε αυτη την function then((response) => { */

/* (το json ειναι function)οταν τα json data ερθουν και εχουν γινει parse  response.json(). τοτε τρεξε και εχεις προσβαση στα parse data then(() =>{  */
/* fetch("http://puzzle.mead.io/puzzle").then(response => {
  response.json().then(data => {
    console.log(data);
  });
}); */

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  //console.log(location);

  messageOne.textContent = "loading";
  messageTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        //console.log(data.error);
      } else {
        //console.log(data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        //console.log(data.location);
        //console.log(data.forecast);
      }
    });
  });
});
