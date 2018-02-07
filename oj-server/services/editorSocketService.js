module.exports = function(io) {
    // collaboration sessions
    var collaborations = {};

    // map from socketId to sessionId
    var socketIdTSessionId = {};

    io.on('connection', (socket) => {
        let sessionId = socket.handshake.query['sessionId'];

        socketIdTSessionId[socket.id] = sessionId;

        if (!(sessionId in collaborations)) {
            collaborations[sessionId] = {
                'participants': []
            };
        }

        // 1: 123, 234
        collaborations[sessionId]['participants'].push(socket.id);

        // socket event listeners
        socket.on('change', delta => {
            console.log("change " + socketIdTSessionId[socket.id] + " " + delta);
            let sessionId = socketIdTSessionId[socket.id];
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for (let i = 0; i < participants.length; i++) {
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("could not tie socket id to any collaboration");
            }
        })
    })
}