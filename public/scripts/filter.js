// let filterOption = () => {
//   let age = document.getElementById("targetAge");
//   console.log(age.value);

//   age.addEventListener("click", () => {
//     console.log(age.value);
//   });
// };

/* ------ SHOW FILTER -----------*/

let saveFilter = () => {
  let saveFilter = document.getElementById("saveFilter");
  let ereaseFilter = document.getElementById("eraseFilter");
  let savedFilter = document.getElementById("filterSaved");
  let btnFilter = document.querySelector("#btnFilter");
  let divbtnFilter = document.querySelector("#collapseOne");


  ereaseFilter.addEventListener('click', () => {
    savedFilter.innerHTML = '';
    btnFilter.className = "accordion-button collapsed";
    btnFilter.ariaExpanded = "false";
    divbtnFilter.className = "accordion-collapse collapse";

  })


  saveFilter.addEventListener("click", () => {
    let age = document.getElementById("targetAge");
    console.log(age.value);
    let location1 = document.querySelector("#optionsRadios1");
    console.log(location1.checked);

    let location2 = document.querySelector("#optionsRadios2");
    console.log(location2.checked);

    savedFilter.style.fontSize = "12px";
    savedFilter.style.alignItems = "center";
    savedFilter.style.padding = "10px";
    console.log(savedFilter);

    if (location1.checked == true) {
      loca = "by location";
    } else {
      let city = document.querySelector("#inputDefault").value;
      loca = city;
    }

    savedFilter.innerText = "filtred by : " + age.value + " / " + loca ;

    let btnFilter = document.querySelector("#btnFilter");
    let divbtnFilter = document.querySelector("#collapseOne");

    console.log(btnFilter);
    btnFilter.className = "accordion-button collapsed";
    btnFilter.ariaExpanded = "false";
    divbtnFilter.className = "accordion-collapse collapse";
  });
};

/* ------------- Checkbox ----------------- */

let checkboxLocation = () => {
  let checkboxValue1 = document.querySelector("#optionsRadios1");
  let checkboxValue2 = document.querySelector("#optionsRadios2");
  let inputLocation = document.querySelector("#inputDefault");

  checkboxValue2.addEventListener("change", () => {
    if (checkboxValue2.checked == true) {
      inputLocation.style = "display:initial";
    }
  });
  checkboxValue1.addEventListener("change", () => {
    if (checkboxValue1.checked == true) {
      inputLocation.style = "display:none";
    }
  });
};
