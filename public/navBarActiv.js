let navBarActiv = () => {

  test = document.querySelectorAll(".nav-link");
  test.forEach((element) => {
    // console.log(element.href)

    // console.log(element.id);
    if (element.id == window.location.pathname) {
      // console.log(element);
      element.parentNode.className += " active";
      element.style.color = "#87a6a0";
    //   element.style.boxShadow = "5px 5px 5px black";
      element.style.textDecoration = "underline #87a6a0";
    //   element.style.fontSize = "20px";
    }
  });
};
