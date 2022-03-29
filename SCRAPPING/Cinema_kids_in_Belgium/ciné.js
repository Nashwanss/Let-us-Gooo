const puppeteer = require('puppeteer');
const fs = require('fs');

console.log('Scrapping data ... just wait ^_^');

const mainURL = "https://www.lepetitmoutard.be/cinema"
const scrapURL = async (url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage()
    await page.goto(url)

    // 	const filmNames = await page.evaluate(() =>
    // 	Array.from(document.querySelector('.container').childNodes[5]).map((filmName) =>
    // 	filmName.innerText.trim()
    // 	)
    // )
    // console.log(filmNames);


    const filmsLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.text-lg.font-semibold.mt-2.truncate')).map((filmURL) =>
        filmURL.parentNode.href
        )
    )
    console.log(filmsLinks);
//  await page.waitForTimeout(2000);


    await browser.close();

	scrapContent(filmsLinks)
}













const scrapContent = async (urls) => {
	let CinemaData = []
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	for (let i = 0; i < urls.length; i++) {
		film = {}
		await page.goto(urls[i])
		// await page.waitForTimeout(6000);

film.Name = await page.evaluate(() => document.querySelector('.page-title').innerText);
film.postingDate = await page.evaluate(() => document.querySelector('.posted-by').innerText);
film.storySummary = await page.evaluate(() => document.querySelector('.blocks__item p').innerText);
film.suitableAge = await page.evaluate(() => document.querySelector('.cinema__genre').innerText);
film.duration = await page.evaluate(() => document.querySelectorAll('.cinema__genre')[3].innerText);
film.genre = await page.evaluate(() => document.querySelectorAll('.cinema__genre')[1].innerText);
// let tempImageLink = await page.evaluate(() => {
// 	elImg = document.querySelector('.position-top')
// 	return elImg ? elImg.innerHTML : "EMPTY"
// });

// // if (tempAdress != null ) {
// // 	zoo.address = await page.evaluate(() => document.querySelector('.dIDBU.MJ').innerText);
// // }else{

// 	film.imageLink  = tempImageLink



// // film.imageLink = await page.evaluate(() => document.querySelector('.position-top').innerHTML);



		// console.log(urls[i]);

		CinemaData.push(film);
		console.log(film)

		saveDataToJson(film);
	}

	await browser.close()
}




// SAVE DATA TO JSON

let saveDataToJson = (film) => {
	let newJsonData = film
	let dataJson = fs.readFileSync("cinéDataArr.json");
	let myObject = JSON.parse(dataJson);

	myObject.push(newJsonData);

	let temp = JSON.stringify(myObject);
	fs.writeFile("cinéDataArr.json", temp, function (err) {
		if (err) throw err;
	});
}
scrapURL(mainURL);


