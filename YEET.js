const fetch = require('node-fetch')

fetch('https://api.jsonbin.io/v3/b/60897fecfa483b12b9df1bfe/latest', {
    method: 'GET',
    headers: {
        "X-Master-Key": "$2b$10$mWfEocJSLYK6ZSyG6u0RfONNJmMk5qnD2eRmsDvVwZSlJ.vgJXj/a"
    }
})
    .then(data => {
        console.log("Yes")
    })
    .catch(function (e) {
        console.error(e.message);
    })