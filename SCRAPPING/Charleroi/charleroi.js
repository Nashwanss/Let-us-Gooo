const puppeteer = require('puppeteer');
const fs = require('fs');
console.log('Scrapping data ... just wait ^_^');

const mainURL = "https://www.lepetitmoutard.be/activites-enfants_39/charleroi_1505/enfant.asp"
const scrapURL = async (url) => {
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage()
	await page.goto(url)

	// const activityNames = await page.evaluate(() =>
	// 	Array.from(document.querySelectorAll('.content-posts')).map((activityName) =>
	// 	activityName.innerText.trim()
	// 	)
	// )
	// console.log(activityNames);


	const cardLinks = await page.evaluate(() =>
		Array.from(document.querySelectorAll('.info.px-4.mt-3 a')).map((cardURL) =>
			cardURL.href
		)
	)
	console.log(cardLinks);
	await browser.close();
	// scrapContent(cardLinks);
}


const scrapContent = async (urls) => {
	let activityData = []
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	for (let i = 0; i < urls.length; i++) {
		activity = {}
		await page.goto(urls[i])
		// await page.waitForTimeout(6000);


		activity.Name = await page.evaluate(() => document.querySelector('.page-title.display-4').innerText);
		activity.about = await page.evaluate(() => document.querySelector('.col-12.content').innerText);
		activity.address = await page.evaluate(() => document.querySelector('.group-title').innerText);
		// activity.ageCategory = await page.evaluate(() => document.querySelectorAll('.border-top')[4].innerText);

		// console.log(urls[i]);

		activityData.push(activity);
		console.log(activity)

		saveDataToJson(activity);
	}

	await browser.close()

}

scrapURL(mainURL);


// // SAVE DATA TO JSON

// let saveDataToJson = (activity) => {
// 	let newJsonData = activity
// 	let dataJson = fs.readFileSync("charleroiDataArr.json");
// 	let myObject = JSON.parse(dataJson);

// 	myObject.push(newJsonData);

// 	let temp = JSON.stringify(myObject);
// 	fs.writeFile("charleroiDataArr.json", temp, function (err) {
// 		if (err) throw err;
// 	});
// }
