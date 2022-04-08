btnWishList = () => {
  let btnAddWish = document.querySelectorAll("#addWishList");

    btnAddWish.forEach((btn) => {

  btn.addEventListener("click", (cardClicked) => {
    console.log(cardClicked.path[3].id);
  });
});
};
