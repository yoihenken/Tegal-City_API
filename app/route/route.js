const express = require("express")
const router = express.Router()
const controller = require("../controller/home-controller")

router.get("/berita/:page", controller.getBerita)
router.get("/berita/detail/:page/:id", controller.getBeritaDetail)
// router.post("/berita/detail", controller.getBeritaDetail) //USING POST


module.exports = { router };