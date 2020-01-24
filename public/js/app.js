console.log('Client is loading up')
const fetch = require('node-fetch')
  
fetch(
  "http://localhost:3000/?address=wylie,%20tx"
).then(response => {
  response.json().then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data)
    }
  })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = search.value
  console.log(address)
})