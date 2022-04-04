const axios  = require('axios');
const cheerio = require('cheerio');

async function getData() {
    try {
        return await axios.get('https://finance.daum.net/domestic/themes');
    } catch(error) {
        console.error(error);
    }
}

// daumThemeList = [];
// daumThemeStockList = {
// '테마명1' : [종목1, 종목2,종목3], '테마명2' : [종목1, 종목2,종목3] .....
// }

getData().then(html => {
    const daumThemeList = [];
    const $ = cheerio.load(html.data); 

    const daumThemeStockList = $('div table > tbody > tr > th > span');

    const daumThemeStockList1 = $('div.tableB table > tbody').children('tr > th > span'); 

    daumThemeStockList.each(function(i, elem) {
        daumThemeList[i] = {
            themeName : $(this).find("th span").text()
        };
    });
    return daumThemeList;
}).then(res => console.log(res));




// daum_crawler.js
