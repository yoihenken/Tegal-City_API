const express = require("express")
const router = express.Router()
const controller = require("../controller/home-controller")

router.get("/berita/:page", controller.getBerita)
router.get("/berita/detail/:page/:id", controller.getBeritaDetail)
router.get("/pariwisata/:id", controller.getPariwisata)

module.exports = { router };