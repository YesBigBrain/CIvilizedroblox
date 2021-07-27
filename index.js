// create an express app
const express = require("express")
const app = express()
const fs = require("fs");
const path = require('path');
const db = require("quick.db");
const fetch = require("node-fetch");
let cureval = [];
async function postData(valuetoadd) {
  fetch('https://api.jsonbin.io/v3/b/60897fecfa483b12b9df1bfe/latest', {
      method: 'GET',
      headers: {
        "X-Master-Key": "$2b$10$mWfEocJSLYK6ZSyG6u0RfONNJmMk5qnD2eRmsDvVwZSlJ.vgJXj/a"
      }
    })
    .then(response => response.json())
    .then(data => {
      cureval = data.record
      const add = [valuetoadd];
      let datataken = cureval.concat(add);
      fetch('https://api.jsonbin.io/v3/b/60897fecfa483b12b9df1bfe', {
          method: 'PUT',
          headers: {
            "X-Master-Key": "$2b$10$mWfEocJSLYK6ZSyG6u0RfONNJmMk5qnD2eRmsDvVwZSlJ.vgJXj/a",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datataken)
        })
        .then(response => response.json())
        .then(data => {
          cureval = data.record
        });
    });
};
async function getdata(name1, res) {
  fetch('https://api.jsonbin.io/v3/b/60897fecfa483b12b9df1bfe/latest', {
      method: 'GET',
      headers: {
        "X-Master-Key": "$2b$10$mWfEocJSLYK6ZSyG6u0RfONNJmMk5qnD2eRmsDvVwZSlJ.vgJXj/a"
      }
    })
    .then(response => response.json())
    .then(data => {
      let returndata = 'none';
      cureval = data.record
      for (i = 0; i < cureval.length; i++) {
        let string = cureval[i] + '';
        let parts = string.split(`:`);
        let name = parts[0];
        let value = parts[1];
        if (name === name1) {
          returndata = value
          cureval.splice(i, 1);
          if (cureval.length === 0){
            cureval = ["Placeholder:Ok"]
          }
          fetch('https://api.jsonbin.io/v3/b/60897fecfa483b12b9df1bfe', {
              method: 'PUT',
              headers: {
                "X-Master-Key": "$2b$10$mWfEocJSLYK6ZSyG6u0RfONNJmMk5qnD2eRmsDvVwZSlJ.vgJXj/a",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(cureval)
            })
            .then(response => response.json())
            .then(data => {
              cureval = 0
          });
        }
      }
      res.send(returndata)
    })
}
// use the express-static middleware
app.use(express.static("public"))
// define the first route
app.get("/GitHub", function(request, response) {
  response.sendFile(path.join(__dirname, '/Github.html'))
})
app.post("/", function(request, response) {
  //response.send("<h1>Hello World!</h1>")
  const {
    headers,
    method,
    url
  } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    response.on('error', (err) => {
      console.error(err);
    });
    let parts = body.split(`,`);
    let namepart = parts[0]
    let get = parts[1];
    let valuepart = parts[2];
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    let parts123123123 = get.split(`:`);
    let yessir = parts123123123[1];
    let NAMETEST3213213 = yessir.split(`"`);
    let yeet11231242 = NAMETEST3213213[1];
    if (namepart === `{"get":"true"`){
      namepart = get
      yeet11231242 = "true"
    }
    if (yeet11231242 === "false") {
      //-----
      let string1 = namepart + '';
      let parts1 = string1.split(`:`);
      let NAME = parts1[1];
      //-----
      let string2 = valuepart + '';
      let parts2 = string2.split(`:`);
      let value1 = parts2[1];
      let string3 = value1 + '';
      //-----
      let parts3 = string3.split(`}`);
      let value = parts3[0];
      //-----
      let NAMETEST = NAME.split(`"`);
      let NAME123 = NAMETEST[1];
      //-----
      let VALUETREST = value.split(`"`);
      let value23 = VALUETREST[1];
      const add = `${NAME123}:${value23}`;
      postData(add)
      response.send("Success");
    } else if (yeet11231242 === "true") {
      //-----
      let string1 = namepart + '';
      let parts1 = string1.split(`:`);
      let NAME = parts1[1];
      let NAMETEST = NAME.split(`"`);
      let NAME123 = NAMETEST[1];
      getdata(NAME123, response)
    }
  })
})

// start the server listening for requests
app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  db.set("Info", [])
});
