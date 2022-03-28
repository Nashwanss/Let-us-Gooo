const puppeteer = require('puppeteer');
const fs = require('fs');

console.log('Scrapping data ... just wait ^_^');

const mainURL = "https://www.tripadvisor.com/Attractions-g188634-Activities-c61-t134-Belgium.html" //ZOO
const scrapActivitiyURL = async (url) => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage()
	await page.goto(url)
	// const zooNames = await page.evaluate(() =>
	// 	Array.from(document.querySelectorAll('.bUshh.o.csemS')).map((zooName) =>
	// 		zooName.innerText.trim()
	// 	)
	// )
	// console.log(zooNames);

	const zooLinks = await page.evaluate(() =>
		Array.from(document.querySelectorAll('.fVbwn.cdAAV.cagLQ.eZTON a:not(.iPqaD._F.G-.ddFHE.eKwUx.btBEK.fUpii)')).map((zooURL) =>
			zooURL.href
		)
	)
	console.log(zooLinks);
	await browser.close()
	scrapContent(zooLinks);
}


const scrapContent = async (urls) => {
	let zooData = []
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	for (let i = 0; i < urls.length; i++) {
		zoo = {}
		await page.goto(urls[i])
		await page.waitForTimeout(6000);
		// console.log(urls[i]);

		zoo.name = await page.evaluate(() => document.querySelector('.WlYyy.cPsXC.GeSzT').innerText);
		zoo.about = await page.evaluate(() => document.querySelector('.pIRBV._T.KRIav').innerText);
		let tempAdress = await page.evaluate(() => {
			elAdress = document.querySelector('.dIDBU.MJ')
			return elAdress ? elAdress.innerText : "EMPTY"
		});

		// if (tempAdress != null ) {
		// 	zoo.address = await page.evaluate(() => document.querySelector('.dIDBU.MJ').innerText);
		// }else{

		zoo.address = tempAdress
		// }
		let tempRating = await page.evaluate(() => {
			elRating = document.querySelector('.WlYyy.cPsXC.fksET.cMKSg')
			return elRating ? elRating.innerText : "EMPTY"
		});

		// if (tempRating != null ) {
		// 	zoo.rating = await page.evaluate(() => document.querySelector('.WlYyy.cPsXC.fksET.cMKSg').innerText);
		// }else{

		zoo.rating = tempRating
		// }
		zoo.website = await page.evaluate(() => document.querySelector('.bfQwA._G.B-._S._T.c.G_.P0.ddFHE.cnvzr.bTBvn').href);

		zooData.push(zoo);
		console.log(zoo)

		saveDataToJson(zoo);
	}
	console.log(zooData);

	await browser.close()
}
scrapActivitiyURL(mainURL);


// SAVE DATA TO JSON

let saveDataToJson = (zoo) => {
	let newJsonData = zoo
	let dataJson = fs.readFileSync("zooDataArr.json");
	let myObject = JSON.parse(dataJson);

	myObject.push(newJsonData);

	let temp = JSON.stringify(myObject);
	fs.writeFile("zooDataArr.json", temp, function (err) {
		if (err) throw err;
	});
}
