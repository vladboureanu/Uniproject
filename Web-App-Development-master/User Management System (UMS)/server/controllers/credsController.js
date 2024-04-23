const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/database');

exports.login_page = (req, res) => {
    res.render('login');
};

exports.register_page = (req, res) => {
    res.render('register');
};

exports.register = (req, res) => {
    const {username, email, password} = req.body;

    db.get(`SELECT id FROM creds WHERE email = ?`, [email], (err, emailExists) => {
        if(err) { 
            console.log('email 5000');
            return res.status(500).render('500') 
        }
        
        if(emailExists) { return res.status(409).json({error: 'Email already exists.'}) }

        db.get(`SELECT id FROM creds WHERE username = ?`, [username], (err, userExists) => {
            if(err) { 
                console.log('user 5000');
                return res.status(500).render('500') 
            }

            if(userExists) { return res.status(409).json({error: 'Username already taken.'}) }

            const hashPass = bcrypt.hashSync(password, 10);

            db.run(`INSERT INTO creds (username, email, password) VALUES (?,?,?)`,
                    [username, email, hashPass], 
                    (err) => {
                        if(err) {
                            console.error(err);
                            return res.status(500).render('500');
                        }
                        res.status(200).json({message: "Successfully registered user."});
            });
        });
    });
};

exports.login = (req, res) => {
    const {login, password} = req.body; // login variable can either be username or email

    db.get(`SELECT * FROM creds WHERE username = ? OR email = ?`, [login, login],
            (err, user) => {
                if(err) {
                    console.error(err);
                    return res.status(500).render('500');
                }

                if(!user) { return res.status(401).json({message: 'Invalid email or username.'})};

                const passMatch = bcrypt.compareSync(password, user.password);
                if(!passMatch) { return res.status(401).json({message: 'Incorrect password.'})};

                console.log(user);
                req.session.userId = user.id;
                req.session.authorized = true;

                console.log('session id', req.session.id);

                // res.cookie( name, value, [,options] )
                res.cookie('username', user.username, {secure: true}).json({message: 'User authorized successfully.'});
                //res.cookie('session id', req.session.id, {secure: true});
                //res.send('Cookies are set');
            }
    )
};

exports.logout = (req, res) => {
    req.session.destroy();
    
    res.redirect('/login'); // redirect to a page that does not need authorisation rights, f.e. login
}