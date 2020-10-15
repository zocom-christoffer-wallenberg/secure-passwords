/* 
    1. Slumpa ett lösenord från en sträng av tecken.
    2. Lösenordet ska vara 8 tecken långt.
*/

const sha1 = require('js-sha1');

const hashed = sha1('thankyou');
console.log('Hash: ', hashed);


function search(passwords) {
    for(let i = 0; i < passwords.length; i++) {
        if(passwords[i].toLowerCase().indexOf('9bd9d3bb7addc7f46f7b89ebaf3fd6b3b23') !== -1) {
            console.log('Hittade en träff: ', passwords[i].split(':'));
        }
    }
}

async function get() {
    //Fetch mot Password API, skicka in första 5 tecken i hash:en
    const response = await fetch('http://api.pwnedpasswords.com/range/2fd71');
    //Då svaret ej är json, använd text() för att hämta ut svaret
    const data = await response.text();
    //Gör om till en array för att enklare kunna söka igenom efter träff
    const result = data.split('\n');
    console.log('Data: ', result);
    search(result);
}


get();


function checkPassword(pass) {
    if (pass.indexOf('123') !== -1) {
        randomizePassword();
    } else if (pass.charAt(pass.length - 1) !== '!' 
        || pass.charAt(pass.length - 1) !== '#') {
            randomizePassword();
    }
}

function randomizePassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  
                 'abcdefghijklmnopqrstuvwxyz0123456789@#$!%()';
    let password = '';

    for(let i = 0; i < 8; i++) {
        let char = Math.floor(Math.random() * characters.length);
        console.log('Slumpat tal: ', char);
        console.log('Char: ', characters.charAt(char));
        password += characters.charAt(char);
        console.log('Lösenord: ', password);
    }

    return password;
}

document.querySelector('#btn').addEventListener('click',  () => {
    const password = randomizePassword();
    document.querySelector('#password').value = password;
});