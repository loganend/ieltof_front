/**
 * This script starts a https server accessible at https://localhost:8443
 * to test the chat
 *
 * @author Carlos Delgado
 */
let fs     = require('fs');
let http   = require('http');
let https  = require('https');
let path   = require("path");
let os     = require('os');
let ifaces = os.networkInterfaces();

// Public Self-Signed Certificates for HTTPS connection
let privateKey  = fs.readFileSync('./../certificates/key.pem', 'utf8');
let certificate = fs.readFileSync('./../certificates/cert.pem', 'utf8');

let credentials = {key: privateKey, cert: certificate};
let express = require('express');
let app = express();

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

/**
 *  Show in the console the URL access for other devices in the network
 */
Object.keys(ifaces).forEach(function (ifname) {
    let alias = 0;

    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        console.log("");
        console.log("Welcome to the Chat Sandbox");
        console.log("");
        console.log("Test the chat interface from this device at : ", "https://localhost:8443");
        console.log("");
        console.log("And access the chat sandbox from another device through LAN using any of the IPS:");
        console.log("Important: Node.js needs to accept inbound connections through the Host Firewall");
        console.log("");

        if (alias >= 1) {
            console.log("Multiple ipv4 addreses were found ... ");
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, "https://"+ iface.address + ":9090");
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, "https://"+ iface.address + ":9000");
        }

        ++alias;
    });
});

// Allow access from all the devices of the network (as long as connections are allowed by the firewall)
let LANAccess = "0.0.0.0";
// For http
httpServer.listen(4000, LANAccess);
// For https
httpsServer.listen(4000, LANAccess);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

// Expose the css and js resources as "resources"
app.use('/source', express.static('./source'));