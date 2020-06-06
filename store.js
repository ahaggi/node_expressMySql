const crypto = require('crypto')
const db = require('./db')
 

function randomString() {
    return crypto.randomBytes(4).toString('hex')
}

function saltHashPassword(password) {
    password = password=== null ? '0' : password
    const salt = randomString()
    const hmac = crypto.createHmac('sha512', salt)
    const hash = hmac.update(password)
    return {
        salt,
        encrypted_password: hash.digest('hex')
    }
}

const createUser = (input) => {
    const { username, password } = input
    const { salt, encrypted_password } = saltHashPassword(password)
    return db.insert({ username, salt, encrypted_password })
}

const select = ({id}) => {
    
    return db.select({id})
}



const convertAllPassToHash = async () => {
    var newData = await db.select().then((users) => users.map((usr) => {
        var id = usr.id
        if(usr.password == null) return ;
        var { salt, encrypted_password } = saltHashPassword(usr.password)
        return { id, salt, encrypted_password }
    }

    ))

    var promises = await newData.map( (user)=> {if(user) db.update(user)} )  
    console.log(promises);
    // .then((noe)=>console.log(noe))
    // .catch((err)=>console.log(err))
    
    return newData
 
}

module.exports = { createUser, convertAllPassToHash , select } 