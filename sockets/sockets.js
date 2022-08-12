const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand(new Band('The Beatles'));
bands.addBand(new Band('Komander'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Bad Bunny'));



io.on('connection', client => {


    console.log('Client connected');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { console.log('disconnected') });
    client.on('mensaje', (payload) => {
        console.log('mensaje recibido ', payload);
        io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    })

    client.on('nuevo-mensaje', (payload) => {
        client.broadcast.emit('nuevo-mensaje', payload);
    })

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    })

    client.on('add-band', (payload) => {
        const newband = new Band(payload.name);
        bands.addBand(newband);
        io.emit('active-bands', bands.getBands());
    })


    client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id);
        io.emit('active-bands', bands.getBands());
    })

});
