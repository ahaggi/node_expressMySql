
//Hvis index.html er sånn
{/* <body> 
    <form class="CreateUser">
        <h1>Create a new user</h1>
        <input type="text" class="username" placeholder="username">
        <input type="password" class="password" placeholder="password">
        <input type="submit" value="Create user">
  </form>
                <script src="/app.js"></script>
</body> */}


// Så kan app filen bli sånn

// const CreateUser = document.querySelector('.CreateUser')
// CreateUser.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const username = CreateUser.querySelector('.username').value
//     const password = CreateUser.querySelector('.password').value
//     post('/createUser', { username, password })
// })

// function post(path, data) {
//     return window.fetch(path, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
// }