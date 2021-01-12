const cheerio = require("cheerio")
const { default: Axios } = require("axios");
const { html } = require("cheerio");
const { text } = require("body-parser");


//LIST BERITA
//USING GET
const getBerita = async (req, res, next) => {
    try{
        const page = req.params.page;
        //for destination of web
        const response = await Axios.get("https://www.kompas.com/tag/Tegal?sort=desc&page=" + page);
        // for load html
        const $ = cheerio.load(response.data);
        const list = []
        const lastPage = $("#paging__link--prev")
                            .eq(0)
                            .attr("data-ci-pagination-page")
        if (page > lastPage) {
            res.send({status: false, list})
        } else {
            $(".latest--topic")
            .eq(0)
            .children()
            .each((i, elem) => {
                let object = {}

                object.title = $(elem).find(".article__link").eq(0).text()
                object.url = $(elem).find(".article__link").eq(0).attr("href")
                object.img = $(elem).find("img").eq(0).attr("src")
                object.type = $(elem).find(".article__subtitle--inline").eq(0).text()
                object.date = $(elem).find(".article__date").eq(0).text()
                list.push(object)
            })
            res.send({status: true, list}) 
        }                            
    }catch(err){
        res.send({
            msg: err.stack
        })
    }
}

//DETAIL BERITA
//USING GET
const getBeritaDetail = async(req, res, next) => {
    try{
        const page = req.params.page;
        const id = req.params.id;
        const baseURL = await Axios.get("https://www.kompas.com/tag/Tegal?sort=desc&page=" + page);
        const $baseURL = cheerio.load(baseURL.data);
        
        let listURL = []; 

        $baseURL(".latest--topic")
            .eq(0)
            .children()
            .each((i, elem) => {
                const url = $baseURL(elem).find(".article__link").eq(0).attr("href")
                // console.log(url);
                listURL.push(url)
        })

        const detailURL = await Axios.get(listURL[id] + "?page=all");

        const $ = cheerio.load(detailURL.data);
    
        let object = {}

        object.title    = $("body > div.wrap > div.container.clearfix > div > div > h1.read__title").text()        
        object.img      = $(".photo").eq(0).find("img").eq(0).attr("src");
        object.tanggal  = $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__header.col-offset-fluid.clearfix > div:nth-child(1) > div").text()
        object.penulis  = $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__article.mt2.clearfix.js-tower-sticky-parent > div.col-bs9-7 > div.read__credit.clearfix").text()
        
        //Get content tag p
        let listData = []
        $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__article.mt2.clearfix.js-tower-sticky-parent > div.col-bs9-7 > div.read__content")
            .each((i, elem) => {
                // console.log($(elem).text());
                listData.push($(elem).text().trim())
        })
        object.isi = listData.join()
        
        //push object to list
        res.send({status: true, object}) 
                           
    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

// Pariwisata All
const getPariwisata = async(req, res, next) => {
    try{
        const pariwisata = require("../data/data-pariwisata").listPariwisata        
        let data = []
        
        for (let index = 0; index < pariwisata.length; index++) {
            data.push({title : pariwisata[index].title, image : pariwisata[index].image })
        }

        res.send({status: true, data}) 
    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

// Pariwisata Detail
const getPariwisataDetail = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = require("../data/data-pariwisata").listPariwisata[id]

        res.send({status: true, data}) 

    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

//Get all data Oleh oleh Tegal
const getOleh = async(req, res, next) => {
    try{
        const oleh = require("../data/data-oleh").listOleh
        let data = []
        
        for (let index = 0; index < oleh.length; index++) {
            data.push({title : oleh[index].title, image : oleh[index].image })
        }

        res.send({status: true, data}) 

    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

//Get Oleh oleh Tegal
const getOlehDetail = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = require("../data/data-oleh").listOleh[id]

        res.send({status: true, data}) 

    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}


//Get List Info Event Tegal
const getEvent = async(req, res, next) => {
    try {
        const page = req.params.page;
        //for destination of web
        const response = await Axios.get("https://infotegal.com/category/event-tegal/page/" + page);
        //for load html
        const $ = cheerio.load(response.data);
        const list = []

        let check = $("body.error404").is()
        console.log(check);
            
        $("#main")
        .eq(0)
        .children()
        .each((i, elem) => {
            let object = {}
            const title = $("header > h2").eq(i).find("a")
            
            if(title != ""){
                object.title = $("header > h2").eq(i).find("a").text()
                object.url = $("header > h2").eq(i).find("a").attr("href")
                object.date = $("header > div > span.posted-on > a > time.entry-date.published").eq(i).text()
                object.image = $("div.post-thumb > a").eq(i).find("img").attr("src")
                list.push(object)            
            }
        });

        res.send({status: true, list})   

    } catch (err) {
        res.send({
            msg: err.stack
        })
    }
}

//Get detail Info Event Tegal
const getEventDetail = async(req, res, next) => {
    try {
        console.log("running");
        const page = req.params.page;
        const id = req.params.id;
        //for destination of web
        const baseURL = await Axios.get("https://infotegal.com/category/event-tegal/page/" + page);
        //for load html
        const $baseURL = cheerio.load(baseURL.data);
        
        let listURL = []        

        $baseURL("#main")
        .eq(0)
        .children()
        .each((i, elem) => {
            const title = $baseURL("header > h2").eq(i).find("a")
            
            if(title != ""){
                let url = $baseURL("header > h2").eq(i).find("a").attr("href")
                console.log(url)
                listURL.push(url)            
            }
        });

        const detailURL = await Axios.get(listURL[id]);
        const $ = cheerio.load(detailURL.data);
        
        let object = {}

        object.title    = $("header > h1.entry-title").text()
        object.image    = $("div.single-feat.clearfix > figure > img").attr("src")
        
        let listContent = []
        
        $("div.entry-content").children().each((i,elem) => {
            if($(elem).text() != ""){
                console.log($(elem).text().trim());
                listContent.push($(elem).text().trim())
            }
        })
        listContent.pop()

        object.content  = listContent.join()

        res.send({status : true, object})

        
    } catch (error) {
        console.log(error);
        res.send({
            msg: err.stack
        })
    }
}

//Get all data Kuliner
const getKuliner = async(req, res, next) => {
    try{
        const kuliner = require("../data/data-kuliner").listKuliner
        let data = []
        
        for (let index = 0; index < kuliner.length; index++) {
            data.push({title : kuliner[index].title, image : kuliner[index].image })
        }

        res.send({status: true, data}) 

    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

//Get Kuliner detail
const getKulinerDetail = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = require("../data/data-kuliner").listKuliner[id]

        res.send({status: true, data}) 

    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

//Get all data Penginapan
const getPenginapan = async(req, res, next) => {
    try{
        const penginapan = require("../data/data-penginapan").listPenginapan
        let data = []
        
        for (let index = 0; index < penginapan.length; index++) {
            data.push({title : penginapan[index].title, image : penginapan[index].image })
        }

        res.send({status: true, data}) 

    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

//Get Penginapan detail
const getPenginapanDetail = async(req, res, next) => {
    try{
        const id = req.params.id;
        const data = require("../data/data-penginapan").listPenginapan[id]

        res.send({status: true, data}) 

    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}


module.exports = { getBerita, getBeritaDetail, getPariwisata, getPariwisataDetail, getOleh, getOlehDetail, getEvent, getEventDetail, getKuliner, getKulinerDetail, getPenginapan, getPenginapanDetail}