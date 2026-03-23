let q = { x: 0, y: 0, z: 0, w: 1 };

function sendQuat() {
    const out = [
        { type: "f", value: q.w },      
        { type: "f", value: -q.x },      // roll
        { type: "f", value: q.z },      // pitch  
        { type: "f", value: -q.y }       // yaw
    ];
    // console.log("SEND /Virtuoso/quat", out); // uncomment to debug
    send("localhost", 3001, "/Virtuoso/quat", ...out);
}

module.exports = {
    init() {
        console.log("INIT: module loaded");
    },

    oscInFilter(data) {
        const { address, args } = data;

        if (address.endsWith("/rotation/x")) {
            q.z = args[0].value;
            sendQuat();
        }
        else if (address.endsWith("/rotation/y")) {
            q.y = args[0].value;
            sendQuat();
        }
        else if (address.endsWith("/rotation/z")) {
            q.x = args[0].value;
            sendQuat();
        }
        else if (address.endsWith("/rotation/w")) {
            q.w = args[0].value;
            sendQuat();
        }

        return data; 
    }
};
