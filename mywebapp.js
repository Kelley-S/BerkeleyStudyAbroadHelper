const { KintoneRestAPIClient } = require("@kintone/rest-api-client");
const express = require('express');
const PORT = process.env.PORT || 3000;

// Create express application
const ExpressApp = express();

// Page: (root)
// Action: display contents of /index.html
ExpressApp.get('/', function (req, res) {
    res.sendFile('/index.html', { root: __dirname });
});

// Page: (root)/kintoneresponse
// Action: Get records from Kintone database and display them
ExpressApp.post('/kintoneresponse', function (req, res) {

    const client = new KintoneRestAPIClient({
        baseUrl: 'https://gobears.kintone.com',
        auth: { apiToken: 'TC5p63kXhcotPDNbNksynbPolGx6Iq9S4PW8OFze' }

    });

    const params = {
        app: 1,
        // fields: ['place', 'price'],
        // query: 'price in ("$$")'
    }

    client.record
        .getRecords(params)
        .then(resp => {
            console.dir(resp.records, { depth: null });
            res.send('<div>1. ' + resp.records[0].Location.value + ' ' + resp.records[0].Semester_Year.value + ' Recommended: ' + resp.records[0].Recommend.value + '</div>' +
                        '<div>2. ' + resp.records[1].Location.value + ' ' + resp.records[1].Semester_Year.value + ' Recommended: ' + resp.records[1].Recommend.value + '</div>' +
                      '<div>3. ' + resp.records[2].Location.value + ' ' + resp.records[2].Semester_Year.value + ' Recommended: ' + resp.records[2].Recommend.value + '</div>');
            //res.json(resp.records);
        })
        .catch(err => {
            console.log(err);
        });

});

ExpressApp.listen(PORT, () => console.log(`Listening on ${PORT}`));
