import fs from "fs"
import S3FS from "s3fs"
import path from "path"
import url from "url"
import uuid from "uuid"

import config from "../../config"

let bucketName = config.S3_BUCKET
let imageFolder = config.S3_IMAGE_FOLDER
let baseUrl = config.S3_BASE_URL

const s3fsImpl = new S3FS(bucketName, {
  accessKeyId: config.S3_ACCESS_KEY_ID,
  secretAccessKey: config.S3_SECRET_ACCESS_KEY
})

let mediasService = {}

mediasService.getPath = (fileName) => {
  return path.join(imageFolder, fileName)
}

mediasService.getUrl = (fileName) => {
  return url.resolve(baseUrl, path.join(bucketName, mediasService.getPath(fileName)))
}

mediasService.uploadFromStream = (fileName, stream) => {
  console.log(mediasService.getPath(fileName))
  let extension = path.extname(fileName)
  let name = uuid.v4() + extension
  return s3fsImpl.writeFile(mediasService.getPath(name), stream)
  .then(() => ({
    fileName: name,
    url: mediasService.getUrl(name)
  }))
}

mediasService.uploadFromLocalFile = (file) => {
  const stream = fs.createReadStream(file.path)
  return uploadFromStream(file.originalFilename, stream).then((res) => {
    fs.unlink(file.path, (err) => {
      err && console.error(err);
      return res
    })
  })
}

export default mediasService
