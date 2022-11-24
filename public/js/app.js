const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    const location = search.value
    setTimeout(() => {
        fetch('/weather?address=' + location).then((response) => {
            console.log('response')
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = "la temperatura es de " + data.clima[0] + " Con una sensación termica de " + data.clima[1] + "El clima esta " + data.clima[2] + " y una precipitación de " + data.clima[3]
                    console.log(data.location)
                    console.log(data.clima)
                }
            })
        })
    }, 2000);
})