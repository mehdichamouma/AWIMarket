import express from "express"
import mediasService from "../../medias"
import multer from "multer"
const upload = multer()

let router = express.Router()


router.post("/", upload.single("media"), (req, res) => {
  let {file} = req
  console.log(req.files);
  console.log(file);
  if(file) {
    mediasService.uploadFromStream(file.originalname, file.buffer).then((data) => {
      console.log(data);
      res.json(data)
    })
    .catch(e => {
      console.error(e);
      res.status(500).json(e)
    })
  }
  else {
    res.status(400).json({e: "missing file field media"})
  }

})

export default router
