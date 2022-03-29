//----------------------- INITIALITATION OF CONSTANTE ---------------------------------------------

const { info } = require("console");
const fs = require("fs");
const puppeteer = require("puppeteer");
let dataFullUrl = [];
let dataError = [];
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

// console.log(dataUrls);

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

startTimer =  setTimer();
// console.log(startTimer);

const scrapContent = async () => {
  //   console.log(dataFullUrl);


  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 0; i < dataFullUrl.length; i++) {
    // console.log(dataFullUrl[i]);

    let infos = {};

    // INFORMATION ID

    // infos.id = "000" + i;

    var numberId = i + 1,
      outputId = [],
      sNumberId = numberId.toString();
    len = sNumberId.length;

    for (let iID = 0; iID < len; iID++) {
      outputId.push(+sNumberId.charAt(iID));
    }
    let tempId = i + 1;
    let tempLength = outputId.length;
    if (tempLength == 1) {
      infos.id = "0000" + tempId;
    } else if (tempLength == 2) {
      infos.id = "000" + tempId;
    } else if (tempLength == 3) {
      infos.id = "00" + tempId;
    } else if (tempLength == 4) {
      infos.id = "0" + tempId;
    }

    // console.log(outputId.length);

    //---------------------------- GO TO URL --------------------------------------------------

    await page.goto(dataFullUrl[i]);
    await page.waitForTimeout(3000);

    //----------------------------- TEST ON THE COOKIES BUTTON ---------------------------------

    let tempButton = await page.evaluate(() =>
      document.querySelector(
        "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"
      )
    );
    if (tempButton != "" && tempButton != null) {
      await page.click(
        `#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll`
      );
    }

    //------------------------------- SELECTION INFORMATION ------------------------------
    // INFORMATION : TITRE

    let tempTitle = await page.evaluate(() =>
      document.querySelector(".header__title")
    );

    if (tempTitle != null) {
      infos.title = await page.evaluate(
        () => document.querySelector(".header__title").innerText
      );
    } else {
      infos.title = "Empty";
    }

    // INFORMATION : URL

    infos.url = dataFullUrl[i];

    // INFORMATION : LINK OF IMAGE

    let tempImage = await page.evaluate(() =>
      document.querySelector(".overview__img")
    );

    if (tempImage != null) {
      infos.image = await page.evaluate(
        () => document.querySelector(".overview__img").srcset
      );
    } else {
      infos.image = "Empty";
    }

    // INFORMATION : DESCRIPTION TITRE + CONTENT

    let tempDescription = await page.evaluate(() =>
      document.querySelector(".overview__content.wysiwyg")
    );
    let tempDescriptionContent = await page.evaluate(() =>
      document.querySelector(".overview__content .wysiwyg__chapo")
    );

    if (tempDescription != null) {
      infos.descriptionTitle = "Empty";

      infos.descriptionContent = await page.evaluate(
        () => document.querySelector(".overview__content.wysiwyg").innerText
      );

      if (tempDescriptionContent != null) {
        infos.descriptionTitle = await page.evaluate(
          () =>
            document.querySelector(".overview__content .wysiwyg__chapo")
              .innerText
        );
        infos.descriptionContent = await page.evaluate(
          () =>
            document.querySelector(".overview__content .wysiwyg__chapo")
              .nextElementSibling.innerText
        );
      }

      // INFORMATION : END OF EVENT

      let tempEndOfEvent = await page.evaluate(() =>
        document.querySelector(".header__pre")
      );

      if (tempEndOfEvent != null) {
        infos.endOfEvent = await page.evaluate(
          () => document.querySelector(".header__pre").innerText
        );
      } else {
        infos.endOfEvent = "Empty";
      }

      // ------------------- CLICK ON PAGE "PRATICAL INFORMATION" ------------------------

      await page.waitForTimeout(3000);

      await page.click(`.tabs__inner .tabs__items`);

      await page.waitForTimeout(3000);

      //-------------------- CONTINUE SELECTION INFORMATION ------------------------------
      // SELECTION OF ALL PRATICAL INFORMATION ( Methode ARRAY )

      const infosPractical = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".practical__line")).map(
          (event) => event.children[0].innerText
        )
      );

      const contenuInfosPractical = await page.evaluate(() =>
        Array.from(document.querySelectorAll(".practical__content")).map(
          (event) => event.children[0].innerText
        )
      );

      for (let i = 0; i < infosPractical.length; i++) {
        // changing the case of the text
        let temp1 = infosPractical[i].toLowerCase();
        if (temp1.includes(" ")) {
          const [first, last] = temp1.split(" ");
          let last2 = last.charAt(0).toUpperCase() + last.slice(1);
          let first2 = first.toLowerCase();
          temp1 = first2 + last2;
        }
        let temp2 = contenuInfosPractical[i];

        infos[temp1] = temp2;
      }

      // console.log(infos);
      console.log(
        "\x1b[33m%s\x1b[0m",
        `Succes Data Upload from ${dataFullUrl[i]}`
      );
      saveDataToJson(infos);
    } else {
      console.log("\x1b[31m%s\x1b[0m", `No Data Upload from ${dataFullUrl[i]}`);
      let infosNotAvailable = {
        id: infos.id,
        content: "No Data Available",
        url: infos.url,
      };
      dataError.push(infos.id);
      saveDataToJson(infosNotAvailable);
    }
  }

  await browser.close();
  finishTimer = setTimer();
  await page.waitForTimeout(500);

  // console.log(
  //   "\x1b[36m%s\x1b[0m",
  //   "No Data For this id : " +
  //     dataError +
  //     "\n" +
  //     "Number of id without content : " +
  //     dataError.length +
  //     "\nstart @ " + 
  //     startTimer + 
  //     " and finsih @ " + 
  //     finishTimer
  // );
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



