


function appendData(data) {
  let mainContainer = document.getElementById("eventsContainer");

  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.className = "card bg-light mb-3";
    div.style = "max-width: 21rem;max-height: 30rem;border-radius: 5px";
    mainContainer.appendChild(div);

    let divImage = document.createElement("div");
    divImage.className = "card-image";
    divImage.style = "display:flex;justify-content:center;padding-top:10px;padding-bottom:10px;"
    // divContent.style = "overflow: hidden";

    let divTitle = document.createElement("div");
    divTitle.className = "card-header";
    divTitle.style = "overflow: hidden;max-height: 2.3rem";

    let divContent = document.createElement("div");
    divContent.className = "card-body";
    divContent.style = "overflow: hidden;height:300px;padding-top:0px;";

    let divBtn = document.createElement("div");
    divBtn.className = "card-btn";
    divBtn.style = "padding:15px;"
    // divContent.style = "overflow: hidden";
    
    div.appendChild(divTitle);
    div.appendChild(divImage);
    div.appendChild(divContent);
    div.appendChild(divBtn);

    let pTitle = document.createElement("h5");
    pTitle.className = "title innerCard";
    pTitle.innerHTML = data[i].title;
    divTitle.appendChild(pTitle);

    let pImage = document.createElement("img");
    pImage.src = data[i].image
    pImage.style = "max-width: 21rem;max-height:9rem;border-radius:5px;"

    divImage.appendChild(pImage)


    let pDates = document.createElement("div");
    pDates.className = "dates innerCard";
    pDates.style = "font-size:10px;";

    pDates.innerHTML = data[i].dates;
    divContent.appendChild(pDates);

    let pDesCon = document.createElement("div");
    pDesCon.className = "descriptionContent innerCard";
    pDesCon.style = "overflow: hidden;max-height:4rem;font-size:14px;";
    pDesCon.innerHTML =
      "<b>" + "Description : " + "</b>" + data[i].descriptionContent;
    divContent.appendChild(pDesCon);

    // let pPlace = document.createElement("div");
    // pPlace.className = "place innerCard";
    // pPlace.style = "font-size:12px;"
    // pPlace.innerHTML = "<b>" + "Place : " + "</b>" + data[i].place;
    // divContent.appendChild(pPlace);

    let pPrice = document.createElement("div");
    pPrice.className = "price innerCard";
    pPrice.style = "font-size:12px;";

    pPrice.innerHTML = "<b>" + "Price : " + "</b>" + data[i].prices;
    divContent.appendChild(pPrice);

    let pTarget = document.createElement("div");
    pTarget.className = "price innerCard";
    pTarget.style = "font-size:12px;";

    pTarget.innerHTML = "<b>" + "Target : " + "</b>" + data[i].targetAudience;
    divContent.appendChild(pTarget);

    let pButton = document.createElement("div");
    pButton.className = "button";

    let buttonCard1 = document.createElement("button");
    buttonCard1.innerText = "See More";
    buttonCard1.className = "seeMoreBtn btn btn-info";

    let buttonCard2 = document.createElement("button");
    buttonCard2.innerText = " Add To WL ";
    buttonCard2.className = "plus btn btn-info";



    divBtn.appendChild(pButton);
    pButton.appendChild(buttonCard1);
    pButton.appendChild(buttonCard2);
    
    pButton.style.display = "flex";
    pButton.style.justifyContent = "space-around";

  }
}


