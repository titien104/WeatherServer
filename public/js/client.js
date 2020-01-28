console.log('client is starting')

const failURL = 'http://localhost:3000/weather?address=!'
const testURL = 'http://puzzle.mead.io/puzzle'
// fetch(testURL).then((res)=> {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch(appURL).then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1")
const messageTwo = document.querySelector("#message2")
weatherForm.addEventListener("submit", e => {
    e.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const appURL = 'http://localhost:3000/weather?address='+location
    //console.log(appURL)
    fetch(appURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = 'Address: ' + data.address
                messageTwo.textContent = 'Today Forecast: ' + data.Summary
            }
        })
    })
});
