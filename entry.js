const express = require("express")
const mainApp = express()
const qrCode = require("qrcode")
const fs = require('fs')
const ShortUniqueId = require('short-unique-id')

mainApp.set("view engine", "ejs");
mainApp.set("views", __dirname + "/views");
mainApp.use(express.static(__dirname + "/public"));
mainApp.use(express.json());

const tab_url = []

function generateShortUrl(userUrl, ourDomainName){
    const idForUrl = new ShortUniqueId({ length: 10 }).rnd();
    const urlObject = {idForUrl, userUrl}
    tab_url.push(urlObject)
    // console.log(urlObject)

    return `${ourDomainName}/${idForUrl}`
}
// const tab_url = require('./data/db.json')
// const { url } = require("inspector")

// function updateTabUrl(array){
//     fs.writeFileSync('./data/db.json', JSON.stringify(array, null, 2))
// }

mainApp.get("/", (req, res)=>{
   
    res.render("index", {tab_url });
    
})

mainApp.get("/:uniqueIdGenerated", (req, res)=>{
    const {uniqueIdGenerated} = req.params
    const urlObject= tab_url.find(url_object=> url_object.idForUrl===uniqueIdGenerated)
    if(urlObject){
        res.redirect(urlObject.userUrl)
    }
    else{res.render('404')}

})
mainApp.post("/", (req, res)=>{
    const userUrl = req.body.url
    qrCode.toDataURL(userUrl, function (err, qrCodeGenerated) {
        tab_url.push(qrCodeGenerated);
        updateTabUrl(tab_url)
        const ourDomain =  `${req.protocol}://${req.hostname}:${port}`
        const shortUrl = generateShortUrl(userUrl, ourDomain)
        console.log(ourDomain)
        res.send({qrCodeGenerated, userUrl, shortUrl})

    /*Génération de notre propre URL   */   
    
    // const urlFromUs = new URL("/", )
    })

})


mainApp.get('/*', (req, res) =>{
    res.render("404")
})



const port = 3000

mainApp.listen(port, function(){
    console.log(`the App runs on http://localhost:${port}`)
})