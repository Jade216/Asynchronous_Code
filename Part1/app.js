//1
let favNumber = 9;
let baseURL = "http://numbersapi.com";

$.getJSON(`${baseURL}/${favNumber}?json`)
.then(data => { console.log(data)} );

//2
let favNumbers = [6, 9, 16];
$.getJSON(`${baseURL}/${favNumbers}?json`)
.then(data => { console.log(data)} );

//3
Promise.all(
    Array.from({length:4}, () => {
        return $.getJSON(`${baseURL}/${favNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
})