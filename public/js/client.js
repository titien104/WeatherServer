console.log('client is starting')
const fetch = require('node-fetch')

const appURL = 'http://localhost:3000/weather?address=826%20Austin%20Lane,%20Lavon,%20Tx'
const failURL = 'http://localhost:3000/weather?address=!'
const testURL = 'http://puzzle.mead.io/puzzle'
fetch(testURL).then((res)=> {
    res.json().then((data) => {
        console.log(data)
    })
})

fetch(appURL).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.address)
            console.log(data.Summary)
        }
    })
})

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const address = search.value;
  console.log(address);
});
