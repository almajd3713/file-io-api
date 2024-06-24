const path = require("path")
const express = require("express")
const fs = require("fs")
const uuid = require("uuid").v4

const multer = require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "./data/"
    console.log(file.mimetype)
    if(file.mimetype.startsWith("image/"))
      uploadPath += "images/"

    fs.mkdirSync("uploadPath", {recursive: true})
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid()}_${file.originalname}`)
  }
})
const upload = multer({ dest: "data/", storage: storage})


const PORT = 5656
const app = express()
app.use(express.static(__dirname + "/public"))



app.get("/", (req, res) => {
  res.end()
})


app.post("/post", upload.single("uploadedFile"), (req, res) => {
})

app.listen(PORT, () => console.log("Server has started!"))