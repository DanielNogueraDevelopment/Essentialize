var express = require("express");
var path = require("path");
var app = express();
// const puppeteer = require('puppeteer');
// const browser = puppeteer.launch({ headless: false });
var $ = require("cheerio"); //im pretty sure this is jquery for node?
var rp = require("request-promise");

const axios = require('axios');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
    //beans tho...
    //hi
    //beans tho... yessir


//that moment when beans😮😮😮


















app.use(express.static('public'));





app.get("/", function(req, res) {
    res.redirect("/home.html");
});




app.post("/jobs", function(req, res) {
    var job = req.body.job;
    var location = JSON.parse(req.body.location);
    //btw both of these values work now
    //location is a object with .city, .countryName, .postcode and stuff like that
    //do web scraping here (: 
    //I already installed those 
    var returner = [];
    var url = `https://www.indeed.com/jobs?q=${job}&l=${location.city} ${location.principalSubdivision} ${location.postcode}`;
    rp(url).then(function(html) {

        $(".jobsearch-SerpJobCard", html).each(function(num, job) {

            returner.push(`<a href="https://indeed.com${$(this).find(".jobtitle").attr("href")}">${$(this).find(".title").text()}</a><br>`)

        });

        var url = `https://www.monster.com/jobs/search/?q=${job}&where=${location.city} ${location.principalSubdivision} ${location.postcode}`;
        rp(url).then(function(html) {
            $(".card-header > h2.title", html).each(function(num, job) {
                returner.push(`<a href="${$(this).find("a").attr("href")}">${$(this).text()}</a><br>`)

            })
            var url = `https://ziprecruiter.com/candidate/search/?radius=25&search=${job}&location=${location.city} ${location.principalSubdivision} ${location.postcode}`;
            rp(url).then(function(html) {
                $(".zr_job_result", html).each(function(num, job) {
                    returner.push(`<a href="${$(this).find(".job_link").attr("href")}">${$(this).find(".just_job_title").text()}</a><br>`)
                })

                var returnString = "";
                returner.forEach(function(element) {
                    returnString = returnString + element
                })
                res.send(returnString);

            })



        })
    });


    // var returnString = "";
    // returner.forEach(function(element) {
    //     returnString = returnString + element
    // })
    // res.send(returnString);
    // end script


    // const url = "http://linkedin.com";
    // let siteName = "";

    // const categories = newSet();
    // const tags = newSet();
    // const places = newSet();
    // const positions = newSet();

    // const fetchData = async() => {
    //     const result = await axios.get(url);
    //     return cheerio.load(result.data);
    // };
    // const getResults = async() => {
    //     const $$ = awaitfetchData();
    //     siteName = $$()

    //     const postButton = $$(".jobs - home - scalable - nav__nav - item jobs - home - scalable - nav__post - a - job jobs - home - scalable - nav--md - lg - breakpoint flex - 1 align - items - center >.jobs-post__btn artdeco-button artdeco-button--2 artdeco-button--secondary ember-view");
    //     console.log(postButton);



    // }
});














app.listen(3000);