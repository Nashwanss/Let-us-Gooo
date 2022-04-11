
function sendMail(params) {

  if (document.getElementById("msg").value == ''){
    let divScs = document.getElementById("messageSuccess");
  divScs.innerHTML = `
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    Please enter a message
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
  </button>
  </div>
  `;

  } else {

  let tempParams = {
    from_name: document.getElementById("inputName").value,
    from_email: document.getElementById("inputEmail").value,
    message: document.getElementById("msg").value,
  };
  emailjs.send("gmail", "template_gek8ti9", tempParams).then(function (res) {
    console.log("success", res.status);
  });

  let divScs = document.getElementById("messageSuccess");
  divScs.innerHTML = `
  <div class="alert alert-dismissible alert-success">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
  </button>
  <strong>Thanks you for contact us ! </strong> Your email has been sent successfully.
  </div>
  `;

  document.getElementById("msg").value = '';

}

}
