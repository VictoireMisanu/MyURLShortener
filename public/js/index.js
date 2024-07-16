const form_generate = document.querySelector('#form_url_generate')
const input_url = document.querySelector("#url")
const QRcodeShower = document.querySelector("#QRcodeShower")
const shortUrlText = document.querySelector("#shortUrlText")
const longUrlText = document.querySelector("#longUrlText")
const btn = document.querySelector('#button')

console.log(input_url,form_generate)

// btn.addEventListener('click', ()=>{
//     console.log(input_url.value)
// })

form_generate.addEventListener("submit", async(event)=>{
    alert("form submitted")
    event.preventDefault();
    const input_value = input_url.value;
    console.log(input_value)
    const sendData = await fetch("/", {
        method: "POST",
        body: JSON.stringify({url : input_value}),
        headers :{
            "content-type" : "application/json"
        }
    })

    const res = await sendData.json()
    QRcodeShower.src = res.qrCodeGenerated
    shortUrlText.innerHTML = `Your short URL is <a href = "${res.shortUrl}">${res.shortUrl}</a>`
    longUrlText.innerHTML = `Your long URL is <a href = "${res.shortUrl}">${res.userUrl}</a>`
    

    console.log(input_value)
})