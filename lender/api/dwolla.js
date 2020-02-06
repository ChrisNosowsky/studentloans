var dwolla = require('../../node_modules/dwolla-v2');
var DWOLLA_APP_KEY = 'UuPeVlQBHZ6Q2YYcXWBrfXU89AFaugmwfiVIWNacREWecqOuAV';
var DWOLLA_APP_SECRET = 'xuDuZcrtzW4hGpxVKrIe2h7KVivo6JjB5qysFF0sTAyNpT8zMr';

var client = new dwolla.Client({
    key: DWOLLA_APP_KEY,
    secret: DWOLLA_APP_SECRET,
    environment: "sandbox"
});

//get customer data
client.get("customers", {limit: 10, offset: 20})
.then(res => console.log(res.body.total));


// //added customer
// client.post("customers", {
//     firstName: "Jane",
//     lastName: "Doe",
//     email: "jane@doe.com"
// }).then(res => console.log(res.headers.get("location")));

var c;
client.get("/").then(res => {
    c = res.body._links.account.href;
    client.get(c).then(res => console.log(res.body.name));
}, c);

console.log(c);

//figure out scoping issues