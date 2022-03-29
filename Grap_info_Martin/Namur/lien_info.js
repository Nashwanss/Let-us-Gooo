//----------------------- INITIALITATION OF CONSTANTE ---------------------------------------------

const { info } = require("console");
const fs = require("fs");
const puppeteer = require("puppeteer");
let dataFullUrl = [];
let startTimer;
let finishTimer;

// ------------------- TIMER --------------------------------

setTimer = () => {
  var d = new Date();
  var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  return hours;
};

//-------------------------- IMPORT TABLE OF LINK --------------------------------------------------

let temp = fs.readFileSync("memory_activ.json");
dataUrls = JSON.parse(temp);

console.log(dataUrls);

//---------------------------- ALL DATA IN A ARRAY ( links ) -------------------------------------------------

let t = 0;

dataUrls.forEach((tableData) => {
  tableData.forEach((url) => {
    dataFullUrl.push(url);
    t = t + 1;
  });
});

// console.log(dataFullUrl);
// console.log(t)

//--------------------------- COLLECT DATA FROM dataFullUrl ----------------------------------------

startTimer = setTimer();
// console.log(startTimer);

const scrapContent = async () => {
  console.log(dataUrls);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let i = 0; i < dataFullUrl.length; i++) {
    let infos = {};

    let url = dataFullUrl[i];
    await page.waitForTimeout(3000);

    // INFORMATION ID

    const id = url.substring(url.indexOf("=") + 1);

    // console.log(id);
    infos.id = id;

    //---------------------------- GO TO URL --------------------------------------------------

    await page.goto(url);
    // await page.waitForTimeout(3000);

    //------------------------------- SELECTION INFORMATION ------------------------------
    // INFORMATION : TITRE

    let tempTitle = await page.evaluate(
      () => document.querySelector("#entite_body h1").childNodes[0].textContent
    );

    // console.log(tempTitle);

    infos.title = tempTitle;

    // INFORMATION : URL

    infos.url = dataFullUrl[i];

    // INFORMATION : LINK OF IMAGE

    infos.image = await page.evaluate(
      () => document.querySelector("#entite_thumb").style.backgroundImage
    );

    // INFORMATION : DESCRIPTION TITRE + CONTENT

    infos.descriptionContent = await page.evaluate(
      () => document.querySelector("#entite_content").innerText
    );

    // INFORMATION : DATE

    infos.date = await page.evaluate(
      () => document.querySelector("#entite_body h1 span").innerText
    );

    // INFO : DATE more info

    infos.dateMoreInfo = await page.evaluate(
      () => document.querySelector("#entite_content").lastElementChild.innerText
    );

    // INFO / PLACE

    infos.place = await page.evaluate(
      () => document.querySelector("#entite_infos").innerText
    );

    // ------------------- CLICK ON PAGE "PRATICAL INFORMATION" ------------------------

    // await page.waitForTimeout(3000);

    // await page.click(`.tabs__inner .tabs__items`);

    // await page.waitForTimeout(3000);

    //-------------------- CONTINUE SELECTION INFORMATION ------------------------------
    // SELECTION OF ALL PRATICAL INFORMATION ( Methode ARRAY )

    console.log(
      "\x1b[33m%s\x1b[0m",
      `Succes Data Upload from ${dataFullUrl[i]}`
    );

    // console.log(infos);

    saveDataToJson(infos);
  }

  await browser.close();
  finishTimer = setTimer();
  await page.waitForTimeout(500);

  console.log(
    "\x1b[36m%s\x1b[0m",
    "No Data For this id : " +
      dataError +
      "\n" +
      "Number of id without content : " +
      dataError.length +
      "\nstart @ " +
      startTimer +
      " and finsih @ " +
      finishTimer
  );
};

scrapContent();

//---------------------- SAVE DATA TO JSON.file ---------------------------------------------

let saveDataToJson = (infos) => {
  let newJsonData = infos;
  let dataJson = fs.readFileSync("memory_info_activ.json");
  let myObject = JSON.parse(dataJson);

  myObject.push(newJsonData);

  let temp = JSON.stringify(myObject);
  fs.writeFile("memory_info_activ.json", temp, function (err) {
    if (err) throw err;
    console.log(
      "\x1b[32m%s\x1b[0m",
      "Infos Saved! ( N°" +
        infos.id +
        " )" +
        "\n -> from : " +
        infos.url +
        "\n -> @ " +
        setTimer() +
        "\n"
    );
  });
};
