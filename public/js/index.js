const form_generate = document.querySelector('#form_url_generate')
const input_url = document.querySelector("#input_value")
const QRcodeShower = document.querySelector("#QRcodeShower")
const shortUrlText = document.querySelector("#shortUrlText")

form_generate.addEventListener("submit", async(event)=>{
    form_generate.preventDefault()
    const input_value = input_url.value
    
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
    

    console.log(input_value)
})