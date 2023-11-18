const dhcp = require('dhcp');

function clientCreation() {
    try {
        const s = dhcp.createClient();
        console.log('S :- ', s)

        s.on('bound', function (state) {
            console.log("State: ", state);
        });

        s.listen(function () {
            console.log("Listening");
        });
    } catch (error) {
        console.log('Error :- ', error)
    }
}

clientCreation()
