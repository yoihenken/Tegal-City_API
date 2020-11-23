const cheerio = require("cheerio")
const { default: Axios } = require("axios");
const { html } = require("cheerio");

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
                const title = $(elem).find(".article__link").eq(0).text()
                const url = $(elem).find(".article__link").eq(0).attr("href")
                console.log(url);
                const img = $(elem).find("img").eq(0).attr("src")
                const type = $(elem).find(".article__subtitle--inline").eq(0).text()
                const date = $(elem).find(".article__date").eq(0).text()
                list.push({
                    title, url, img, type, date
                })
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
        let burl = "https://www.kompas.com/tag/Tegal?sort=desc&page=" + page
        const baseURL = await Axios.get("https://www.kompas.com/tag/Tegal?sort=desc&page=" + page);
        const $baseURL = cheerio.load(baseURL.data);
        
        console.log(burl);

        let listURL = []; 

        //Bermasalah
        $baseURL(".latest--topic")
            .eq(0)
            .children()
            .each((i, elem) => {
                console.log("Disini error");
                const url = $baseURL(elem).find(".article__link").eq(0).attr("href")
                console.log(url);
                listURL.push(url)
        })

        console.log(listURL[id]);
        console.log(listURL);

        const detailURL = await Axios.get(listURL[id] + "?page=all");

        const $ = cheerio.load(detailURL.data);
    
        const list = [];
        let object = {};

        object.title    = $("body > div.wrap > div.container.clearfix > div:nth-child(4) > div > h1").text()        
        object.img      =  $(".photo").eq(0).find("img").eq(0).attr("src");
        object.tanggal  = $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__header.col-offset-fluid.clearfix > div:nth-child(1) > div").text()
        object.penulis  = $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__article.mt2.clearfix.js-tower-sticky-parent > div.col-bs9-7 > div.read__credit.clearfix").text()
        
        //Get content tag p
        let listData = []
        $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__article.mt2.clearfix.js-tower-sticky-parent > div.col-bs9-7 > div.read__content")
            .each((i, elem) => {
                // console.log($(elem).text());
                listData.push($(elem).text().trim())
        })
        object.isi = listData
        
        //push object to list
        res.send({status: true, data:object}) ;
                           
    }catch(err){
        console.log(err);
        res.send({
            msg: err.stack
        })
    }
}

// // DETAIL BERITA
// // USING POST
// const getBeritaDetail = async(req, res, next) => {
//     try{
//         const url = req.body.url;
//         const response = await Axios.get(url + "?page=all");
//         const $ = cheerio.load(response.data);
//         const list = [];
//         let object = {};

//         object.title = $("body > div.wrap > div.container.clearfix > div:nth-child(4) > div > h1").text()        
//         object.img =  $(".photo").eq(0).find("img").eq(0).attr("src");
//         object.tanggal = $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__header.col-offset-fluid.clearfix > div:nth-child(1) > div").text()
//         object.penulis = $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__article.mt2.clearfix.js-tower-sticky-parent > div.col-bs9-7 > div.read__credit.clearfix").text()
        
//         //Get content tag p
//         let listData = []
//         $("body > div.wrap > div.container.clearfix > div.row.col-offset-fluid.clearfix.js-giant-wp-sticky-parent > div.col-bs10-7.js-read-article > div.read__article.mt2.clearfix.js-tower-sticky-parent > div.col-bs9-7 > div.read__content")
//         .each((i, elem) => {
//             // console.log($(elem).text());
//             listData.push($(elem).text().trim())
//         })
//         object.isi = listData
        
//         //push object to list
//         res.send({status: true, data:object}) ;
                           
//     }catch(err){
//         console.log(err);
//         res.send({
//             msg: err.stack
//         })
//     }
// }




module.exports = { getBerita, getBeritaDetail }
