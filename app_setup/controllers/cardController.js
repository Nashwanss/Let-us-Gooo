const axios = require('axios');
const { cp } = require('fs');
const { JSDOM } = require('jsdom')
 
let cardPlaces = []

const getCardFromTheSite = async (req, res) => {
	try {
		const { data } = await axios.get('https://www.inspirock.com/belgium/liege-province-with-kids')
		// console.log(data)
 		const { document } = new JSDOM(data).window
		//  console.log(document)

 		let cardFromWebSites = document.querySelectorAll('.attraction-block.c-card.event-block')
		
 		console.log(cardFromWebSites.length)
 		cardFromWebSites.forEach((cardFromWebSite) => {
 	
 				let cardPlace = {}

 				cardPlace.title = cardFromWebSite.querySelector('.name-wrap').textContent
 				cardPlace.authors = cardFromWebSite.querySelector('.tag').textContent
 				cardPlace.image = cardFromWebSite.querySelector('.lazyload').src
				// cardPlace.moreInfo = cardFromWebSite.querySelector('cta-button large attractionDetailsLink')
				
 				cardPlaces.push(cardPlace)
 				console.log(cardPlaces)
 			})
 			
 		
 		
	}catch(error){
		throw error
	}

	res.send(cardPlaces)
}


module.export = getCardFromTheSite 