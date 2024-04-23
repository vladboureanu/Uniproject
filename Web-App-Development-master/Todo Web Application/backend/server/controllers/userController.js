const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/database');

exports.register = (req, res) => {
    const {email, username, password} = req.body;
    const saltRounds = 10;

    db.get(`SELECT id FROM users WHERE email = ?`, email, (err, emailExists) => {
        if(err) { return res.status(500).json({error: "Error while checking email address."}); }

        if(emailExists) {return res.status(409).json({error: "Email already registered."});}

        db.get(`SELECT id FROM users WHERE username = ?`, username, (err, userExists) => {
            if(err) { return res.status(500).json({error: "Error while checking username."}); }

            if(userExists) {return res.status(409).json({error: "Username already taken."});}

            const hashPass = bcrypt.hashSync(password, saltRounds);

            db.run(`INSERT INTO users (email, username, password) VALUES (?,?,?)`,
            [email, username, hashPass], 
            (err) => {
                if(err) {
                    console.error(err.message);
                    return res.status(500).json({error: 'Failed to register user.'});
                }
                res.status(200).json({message: "Successfully registered user."});
            });
        });

    });

};

exports.login = (req, res) => {
    const {login, password} = req.body; // login variable can either be email or username

    db.get(`SELECT * FROM users WHERE email = ? OR username = ?`, [login, login], 
    (err, user) => {
        if(err) {
            console.error(err.message);
            return res.status(500).json({error: 'Authentication failed'});
        }

        if(!user) { return res.status(401).json({error: 'Invalid email or username.'}); }

        const passMatch = bcrypt.compareSync(password, user.password);
        if(!passMatch) { return res.status(401).json({error: 'Invalid password'}); }

        console.log(user);
        //req.session.user = user;
        req.session.userId = user.id;
        req.session.authorized = true;

        console.log('session id', req.session.id);

        res.cookie('username', user.username, {secure: true}).json({message: 'User authenticated successfully.'});

    });
};

exports.logout = (req, res) => {
    req.session.destroy();

    // res.redirect('/login');
}