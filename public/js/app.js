console.log('Client is loading up')
  
fetch(
  "http://localhost:3000/weather?address=826%20Austin%20Lane,%20Lavon,%20Tx"
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