


const addToWishList = () => {
  let btnAddWish = document.querySelectorAll("#addWishList");

    btnAddWish.forEach((btn) => {

  btn.addEventListener("click", function(cardClicked) {
   
    let userId = document.querySelector('#userId').dataset.userid;
    let activityId = cardClicked.target.dataset.activityid;
    let wishList = {
      activityId: activityId,
      userId: userId
    };
   
    fetch("/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(wishList)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  })});
};


/*if (user) {
  $(document).ready(function () {
    $('.plus').click(function () {
      var id = $(this).parent().parent().parent().attr('id');
      var userId = $('#userId').attr('data-userId');
      $.ajax({
        url: '/addToWishList',
        type: 'POST',
        data: {
          id: id,
          userId: userId
        },
        success: function (data) {
          console.log(data);
        }
      });
    });
  }); */

addToWishList();
// btnWishList();

const removeFromWishList = () => {
  let btnRemoveWish = document.querySelectorAll("#removeWishList");

    btnRemoveWish.forEach((btn) => {

  btn.addEventListener("click", function(cardClicked) {
   
    let userId = document.querySelector('#userId').dataset.userid;
    let wlId = cardClicked.target.dataset.wlid;
    console.log(cardClicked.target.dataset.wlid);
    
    fetch(`/wishlist/${wlId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  })});
}

removeFromWishList()
