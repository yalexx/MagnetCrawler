const fs = require("fs");
const _ = require('underscore');

const MAIL_PROVIDERS = ['abv.bg', 'gmail.com', 'mail.bg', 'yahoo.com', 'hotmail.com', 'dir.bg', 'yahoo.co.uk']
FILE_NAME = 'clean-mails.txt'

function contains(target, pattern) {
    let value = 0;
    pattern.forEach(function(word) {
        value = value + target.includes(word);
    });
    return (value === 1)
}


function storeNewEmail(email) {
    if(email != undefined ) {
        console.log(email);
        fs.appendFileSync(FILE_NAME, email + '\n', "UTF-8",{'flags': 'a+'});
    }
}



console.log('start cleanup');
const allFileContents = fs.readFileSync('test-mails.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(email =>  {
    // console.log(`Line from file: ${line}`);
    if (contains(email.toLowerCase(), MAIL_PROVIDERS)) {
        console.log(email)
        storeNewEmail(email);
    }
});

