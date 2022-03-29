const puppeteer = require("puppeteer");
const fs = require("fs");

// function delay(time) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, time);
//   });
// }

//------------------------------------------------------------------------------------
// SELECTION DES LIENS POUR CHAQUE EVENT

const scrap = async () => {
    let url = "https://www.namurtourisme.be/fr/evenements/";

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url);
    //await delay(5000);
    // await page.waitForTimeout(7000);

    const eventUrl = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".event_thumb a")).map(
        (event) => event.href
      )
    );
    await browser.close();
    saveDataToJson(eventUrl, url);
    eventUrl.forEach((element) => {
      console.log(element);
    });
  
};

scrap();

//-------------------------------------------------------------------------------------
// SAVE DATA TO JSON

let saveDataToJson = (eventUrl, url) => {
  let newJsonData = eventUrl;
  let dataJson = fs.readFileSync("memory_activ.json");
  let myObject = JSON.parse(dataJson);

  myObject.push(newJsonData);

  let temp = JSON.stringify(myObject);
  fs.writeFile("memory_activ.json", temp, function (err) {
    if (err) throw err;
    // TIMER ----------------------
    var d = new Date();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    // console.log("\n" + hours);
    //-----------------------------
    console.log("\x1b[32m%s\x1b[0m", "\nEvents Saved! " + "\n -> from : " + url + "\n -> @ " + hours +"\n");
  });
};

