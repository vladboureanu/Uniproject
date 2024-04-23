const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('travel-diary.db');

const initialData = [
    {   
        lat: 51.50799, 
        lng: -0.087592, 
        name: 'London Bridge', 
        desc: 'The London Bridge' 
    }, 
    {
        lat: 51.513695, 
        lng: -0.098341, 
        name: "St Paul's Cathedral", 
        desc: 'Anglican Cathedral'
    },
    {
        lat: 51.505, 
        lng: -0.09,
        name: 'London', 
        desc: 'Centre of London'
    }
];

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat INTEGER NOT NULL, 
            lng INTEGER NOT NULL, 
            name VARCHAR(255) NOT NULL, 
            desc TEXT 
        )
    `);

    db.get(`SELECT COUNT(*) AS count FROM locations`, (err, rows) => {
        if (err) { return console.error(err) }

        const rowsCount = rows.count;
        if(rowsCount === 0) {
            initialData.forEach((location) => {
                db.run(`INSERT INTO locations (lat, lng, name, desc)
                        VALUES (?,?,?,?)`,
                        [location.lat, location.lng, location.name, location.desc], 
                        (err) => {
                            if(err) { return console.error(err) }
                            console.log('Data imported successfully.');
                        });
            });
        }
    });
});

module.exports = db;