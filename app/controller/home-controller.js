const cheerio = require("cheerio")
const { default: Axios } = require("axios");
const { html } = require("cheerio");

const getBerita = async (req, res, next) => {
    try{
        const page = req.params.page;
        const response = await Axios.get("https://www.kompas.com/tag/Tegal?sort=desc&page=" + page);
        // untuk seleksi data
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

const getBeritaDetail = async(req, res, next) => {
    try{
        // const type = req.params.type;
        // const id = req.params.id;
        // const response = await Axios.get("https://" + "regional.kompas.com" + id + "?page=all");
        
        const response = await Axios.get("https://regional.kompas.com/read/2020/11/18/16032381/puluhan-pedagang-positif-covid-19-masih-ada-yang-nekat-jualan-meski-pasar?page=all#page3");
        
        // untuk seleksi data
        const $ = cheerio.load(response.data);
        const list = [];
        let object = {};

        const title = $("#read__title").eq(0).text();
        const tanggal = $("#read__time").eq(0).text();
        const img = $("#photo_warp").find("img").eq(0).attr("src");
        const imgCaption = $("#photo__caption").eq(0).text();
        const penulis = $(".penulis").find("a").text();
        const editor = $(".editor").find("a").text();
        // object.isi = $("#read__content").eq(0).each
        

        list.push({title,tanggal,img, imgCaption, penulis, editor});
        
        res.send({response: response, status: true, url : response, list}) ;
                           
    }catch(err){
        res.send({
            msg: err.stack
        })
    }
}

module.exports = { getBeritaDetail, getBerita}