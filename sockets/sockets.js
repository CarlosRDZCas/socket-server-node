const {io} = require('../index');

io.on('connection', client => {
    console.log('Client connected');
    client.on('disconnect', () => { console.log('disconnected') });
    client.on('mensaje', (payload) => {
        console.log('mensaje recibido ', payload);
        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    })
});
