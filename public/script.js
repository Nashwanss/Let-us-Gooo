// let saveForUserName = document.querySelector('#saveForUserName')

// let userName = document.querySelector('#userName').value

// let userMail = document.querySelector('#userMail').value

// let userId = document.querySelector('#userId').value

// let updateUserParams = {
//     name: userName,
//     mail: userMail,
//     userId: userId,
// }
// // console.log(updateUserParams)

// saveForUserName.addEventListener('click', () => {

    
//     fetch('/users/update', {
//         method:'PUT',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify(updateUserParams)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
        
//         // mettre a jour les valeurs du user
//     })
//     .catch((e) => {console.log(e)})

// })

let saveChild = document.querySelector('#saveChild')
saveChild.addEventListener('click', () => {
    saveChild.innerHTML = "saved"
})

