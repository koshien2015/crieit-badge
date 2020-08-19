const chrome = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
//import puppeteer from "puppeteer";

export async function getCrieitBadge(user_id) {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless
  });
  const page = await browser.newPage();
  await page.goto("https://crieit.net/users/"+user_id);
  await page.setCacheEnabled(true);
  
  const expSelector = "#app > #container > div.row > div > p.mb-2 > span:nth-child(1)";
  const articlesSelector = "#app > #container > div.row > div > p.mb-2 > span:nth-child(2)";
  const ranksSelector = "#app > #container > div.row > #profile > ul > li.list-group-item.d-block";
  const exp = await page.$(expSelector);
  const articles = await page.$(articlesSelector);
  const ranks = await page.$$(ranksSelector);
  let ranksObj={}
  ranks.forEach(async(rank)=>{
    let rankValue = await (await rank.getProperty('textContent')).jsonValue()
    rankValue = rankValue.replace(/\s+/g, "");
    rankValue = rankValue.replace('位','');
    rankValue = rankValue.replace('/\n/g','');
    const idx = rankValue.indexOf('投稿ランキング');
    const key = rankValue.substring(0,idx);
    const value = rankValue.substring(idx+7,rankValue.length)
    console.log(key)
    ranksObj[key] = value;
  })
  var expValue = await (await exp.getProperty('textContent')).jsonValue();
  var articlesValue = await (await articles.getProperty('textContent')).jsonValue();
  
  console.log(expValue,articlesValue)
  await page.close();
  await browser.close();
  return {
    exp: expValue,
    articles: articlesValue,
    ranksObj: ranksObj
  }

}
//getCrieitBadge('ckoshien')
//module.exports = { getCrieitBadge };
