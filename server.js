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



function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}













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

            returner.push(`<p class="text-center"><a href="https://indeed.com${$(this).find(".jobtitle").attr("href")}">${$(this).find(".title").text()}</a></p>`)

        });

        var url = `https://www.monster.com/jobs/search/?q=${job}&where=${location.city} ${location.principalSubdivision} ${location.postcode}`;
        rp(url).then(function(html) {
            $(".card-header > h2.title", html).each(function(num, job) {
                returner.push(`<p class="text-center"><a href="${$(this).find("a").attr("href")}">${$(this).text()}</a></p>`)

            })
            var url = `https://ziprecruiter.com/candidate/search/?radius=25&search=${job}&location=${location.city} ${location.principalSubdivision} ${location.postcode}`;
            rp(url).then(function(html) {
                $(".zr_job_result", html).each(function(num, job) {
                    returner.push(`<p class="text-center"><a href="${$(this).find(".job_link").attr("href")}">${$(this).find(".just_job_title").text()}</a></p>`)
                })
                var startString = `<!DOCTYPE html> <html lang="en"> <head> <title>essentialize</title> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"> <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script> <style> .navbarcustom { color: #FF8C00; background-color: #191970 } .background { height: 700px; background: linear-gradient(to bottom, #4B0082 0%, #830621 100%) } .nav { text-align: center; margin: 20px 0 0; padding: 10px 0; } .h1 { text-align: center; } .h3 { text-align: center; } .museomoderno { font-family: MuseoModerno } .monospace { font-family: "Lucida Console", Courier, monospace; } } } </style> </head> <body class="background"> <nav class="mx-auto navbar navbar-expand-sm navbarcustom"> <h1 class="monospace">essentialize</h1> <a class="navbar-brand" href="#"> <img src="a.svg" style="width:30px;"> </a> <ul class="navbar-nav "> <li class="nav-item nav"> <a class="mx-auto" style="width: 200px;" class="nav-link monospace mx-auto" href="home.html">Home</a> </li> <li class="nav-item nav "> <a class="mx-auto" style="width: 220px;" class="nav-link monospace mx-auto" href="help.html">Help</a> </li> <li class="nav-item nav"> <a class="mx-auto" style="width: 250px;" class="nav-link monospace mx-auto" href="resources.html">Resources</a> </li> <li class="nav-item nav"> <a class="mx-auto" style="width: 250px;" class="nav-link monospace mx-auto" href="search.html">Search for a job</a> </li> <li class="nav-item dropdown nav "> <div class="dropdown show"> <a class="mx-auto" style="width: 300px;" class="dropdown-toggle monospace" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Creators </a> <div class="dropdown-menu mx-auto" aria-labelledby="dropdownMenuLink"> <a class="dropdown-item " href="dbio.html ">Daniel</a> <a class="dropdown-item " href="ibio.html ">Isabel</a> <a class="dropdown-item " href="tbio.html ">Tyler</a> <a class="dropdown-item " href="ebio.html ">Ellie</a> </div> </div> </li> </ul> </nav><div class="jumbotron">`;
                var endString = "</div></body></html>"
                var returnString = "";

                returner = shuffle(returner);
                returner.forEach(function(element) {
                    if (!element.includes("hous")) {
                        returnString = returnString + element
                    }
                })

                res.send(startString + returnString + endString);

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