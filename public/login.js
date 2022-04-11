// margin-top: 79px;
let missingCredentials = document.querySelector('.alert')
// console.log(missingCredentials)

let loginCard = document.querySelector('.user_card')
console.log(loginCard)

if (missingCredentials.style.display == 'flex') {
    loginCard.style.margin-top == '79px'
}

let loggedOut = document.querySelector('.alert')
let emailAndPasswords = document.querySelector('.form_container')

if (loggedOut.style.display !== 'none') {
    emailAndPasswords.style.margin-top == '500px'
}