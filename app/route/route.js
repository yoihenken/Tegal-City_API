const express = require("express")
const router = express.Router()
const controller = require("../controller/controller")

router.get("/berita/:page", controller.getBerita)
router.get("/berita/detail/:page/:id", controller.getBeritaDetail)
router.get("/pariwisata", controller.getPariwisata)
router.get("/pariwisata/:id", controller.getPariwisataDetail)
router.get("/oleh", controller.getOleh)
router.get("/oleh/:id", controller.getOlehDetail)
router.get("/event/:page", controller.getEvent)
router.get("/event/detail/:page/:id", controller.getEventDetail)

router.get("/kuliner", controller.getKuliner)
router.get("/kuliner/:id", controller.getKulinerDetail)

router.get("/penginapan", controller.getPenginapan)
router.get("/penginapan/:id", controller.getPenginapanDetail)




module.exports = { router };