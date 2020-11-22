const express = require("express")
const router = express.Router()
const controller = require("../controller/home-controller")

router.get("/berita/:page", controller.getBerita)
router.get("/berita/detail/:type/:id", controller.getBeritaDetail)
// router.get("/berita/detail", controller.getBeritaDetail)

module.exports = { router };