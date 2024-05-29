import express, { Request, Response, NextFunction, Router } from "express"
import "dotenv/config"
import multer from "multer"
import json2xls from "json2xls"
import path from "path"
import cors from "cors"

import { extractAndParse } from "./lineProcesser.js"
import bodyParser from "body-parser"

const app = express()
const PORT = process.env.PORT || 4000
const __dirname = path.resolve()

const upload = multer({ dest: "uploads/" })

app.use(cors())
app.use(bodyParser.json())
app.use(json2xls.middleware);
app.use(express.static(path.join(__dirname, "public")))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const router = Router()

router.get("/", async (req, res, next) => {
  try {
    return res.send({ message: "Nothing to see here" })
  } catch (error) {
    return next(error)
  }
})

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file" })
    }

    const result = await extractAndParse(req.file.path)

    res.send(result)
  } catch (error) {
    next(error)
  }
})

router.post("/toExcel", async (req: Request, res: any, next: NextFunction) => {
  try {
    const data = req.body
    if (!data) {
      return res.status(400).send({ message: "Please provide data" })
    }

    res.xls('data.xlsx', data);
  } catch (error) {
    next(error)
  }
})

app.use('/backend', router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err)
  }
  res.status(500).send({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
