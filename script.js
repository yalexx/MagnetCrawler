var Crawler = require("simplecrawler");
var fs = require("fs");
var _ = require('underscore');

// Fetch adress url
Crawler.crawl(

  "http://www.teenproblem.net/forum/"

  ).on("fetchstart",function(queueItem) {
  console.log("Starting request for:",queueItem.url);
})

// Fetch url html
.on("fetchcomplete",function(queueItem, responseBuffer) {
  findEmail(responseBuffer);
});

function findEmail(responseBuffer) {
  var buffer = responseBuffer.toString();
  var email;
  var emailsArray = buffer.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  emailsArray = _.uniq(emailsArray, false);
  if (emailsArray) {
    email = "";
    for (var i = 0; i < emailsArray.length; i++) {
      email += emailsArray[i] + "\n";
    }
  }
  storeNewEmail(email);
}

// Check if the email is new, if yes store in data
function storeNewEmail(email) {
  if(email != undefined ) {
    console.log(email);
    var data = fs.readFileSync('data.txt').toString();
    var dataArray = data.split("\n");
    fs.appendFileSync("data.txt", email, "UTF-8",{'flags': 'a+'});
  }
}