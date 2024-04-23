const express = require('express');
const db = require('../../config/database');

// View all users in the UMS
exports.view_all = (req, res) => {
    try {
        db.all(`SELECT * FROM users`, (err, rows) => {
            res.status(200).render('home', {rows});
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('500');
    }
}

// Search a user in the UMS
exports.search_user = (req, res) => {
    try {
        const {keyword} = req.body; // OR: const keyword = req.body.keyword;
        const query = `SELECT * FROM users WHERE first_name LIKE '%${keyword}%' OR last_name LIKE '%${keyword}%'`;

        db.all(query, (err, rows) => {
            res.render('home', {rows});
        });

    } catch(err) {
        console.error(err);
        res.status(500).render('500');
    }
}


// Render the 'add user' page
exports.add_page = (req,res) => {
    res.render('add-user', {alert: ""});
}

exports.add_user = (req, res) => {
    try {
        const {first_name, last_name, email, phone, position, department} = req.body;
        console.log(req.body);
        const stmt = db.prepare(`INSERT INTO users (first_name, last_name, email, phone, position, department)
                                VALUES (?,?,?,?,?,?)`);
        stmt.run(first_name, last_name, email, phone, position, department);

        res.render('add-user', {alert: `User ${first_name} ${last_name} was added successfully!`});

        stmt.finalize();

    } catch(err) {
        console.error(err);
        res.status(500).render('500');
    }
}

// Render the 'edit user' page
exports.edit_page = (req, res) => {
    res.render('edit-user', {alert: ""});
}

exports.edit_user = (req, res) => {
    try {
        const {first_name, last_name, email, phone, position, department} = req.body;
        const user_id = req.params.user_id;
        const stmt = db.prepare(`UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, position = ?, 
                                department = ? WHERE id = ?`);
        stmt.run(first_name, last_name, email, phone, position, department, user_id);

        res.render('edit-user', {alert: `${first_name} ${last_name}'s information was updated successfully!`});

        stmt.finalize();
    } catch(err) {
        console.error(err);
        res.status(500).render('500');
    }
}

exports.delete_user = (req, res) => {
    try {
        const user_id = req.params.id;

        db.run(`DELETE FROM users WHERE id = ?`, [user_id], (err) => {

            const rows = this.changes;
            if(rows != 0) {
                db.run(`DELETE FROM creds WHERE user_id = ?`, [user_id], (err) => {
                    const crows = this.changes;

                    if(crows === 0) {
                        res.status(404).render('404');
                    } else {
                        res.status(200).redirect('/');
                    }
                });
            }
            
        });   
    } catch(err) {
        console.error(err);
        res.status(500).render('500');
    }
}

exports.inactive_user = (req, res) => {
    try {
        const {user_id} = req.params;

        db.run(`UPDATE users SET status = ? WHERE id = ?`,
                ['inactive', user_id], 
                (err) => {
                    db.run(`SELECT email FROM users WHERE id = ?`, 
                            [user_id], 
                            (err, rows) => {
                                const uemail = rows[0].email;
                                db.run(`DELETE FROM creds WHERE email = ?`, [uemail]);
                            });
                });
    } catch(err) {
        console.error(err);
        res.status(500).render('500');
    }
}
