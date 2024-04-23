const db = require('../../config/database');

exports.get_Locations = (req, res, next) => {
    try {
        db.all(`SELECT * FROM locations`, (err, rows) => {
            if(err) {
                console.error(err);
                return res.status(500);
            }
            //console.log(rows);
            res.locals.locations = rows; // Pass data to the next middleware/route
            next(); // Proceed to the next middlware/route
        });
    } catch(err) {
        console.error(err);
        res.render('500'); // Render the `500.ejs` page
    }
};

exports.main_page = (req, res) => {
    try {
        const locations = res.locals.locations;
        res.render('main', {locations});
    } catch(err) {
        console.error(err);
        res.render('500'); // Render the `500.ejs` page
    }
}

exports.new_marker = (req, res) => {
    try {
        const {lat, lng, name, desc} = req.body;

        db.run(`INSERT INTO locations (lat, lng, name, desc) 
                VALUES (?,?,?,?)`,
                [lat, lng, name, desc], 
                (err) => {
                    if(err) {
                        console.error(err);
                        return res.status(500);
                    }
                    res.status(201).json({message: 'Location created successfuly.'});
                }
        );

    } catch(err) {
        console.error(err);
        res.render('500'); // Render the `500.ejs` page
    }
};

// exports.edit_marker = (req, res) => {
//     try {

//     } catch(err) {
//         console.error(err);
//         res.render('500'); // Render the `500.ejs` page
//     }
// };

// exports.delete_marker = (req, res) => {
//     try {

//     } catch(err) {
//         console.error(err);
//         res.render('500'); // Render the `500.ejs` page
//     }
// };