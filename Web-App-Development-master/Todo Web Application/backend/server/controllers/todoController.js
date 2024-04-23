const express = require('express');
const fileup = require('express-fileupload');
const db = require('../../config/database');

// Routes
// Get all TODO items
exports.getAll = (req, res) => {
    // When requesting for the whole database, use the .all() method
    db.all(`SELECT * FROM todos`, (err, rows) => {
        if(err) {
            res.status(500).send({error: err.message});
        } else {
            res.send(rows);
        }
    });
}

exports.addTodo = (req, res) => {
    const {task} = req.body;
    // const task = req.body.task;

    // Prepare query
    const stmt = db.prepare(`INSERT INTO todos (task) VALUES (?)`);
    // Execute query on the PREPARE object, NOT the database itself
    stmt.run(task, (err) => {
        if(err) {
            res.status(500).send({error: err.message});
        } else {
            res.sendStatus(200);
        }
    });

    // Finalise query
    stmt.finalize();
}


exports.updateTask = (req, res) => {
    const {task} = req.body;
    const id = req.params.id; // OR const {id} = req.params;

    const stmt = db.prepare(`UPDATE todos SET task = ? WHERE id = ?`);

    stmt.run(task, id, (err) => {
        if(err) {
            res.status(500).send({error: err.message});
        } else {
            res.sendStatus(200);
        }
    });

    stmt.finalize();
};

exports.setComplete = (req, res) => {
    const {id} = req.params;

    const stmt = db.prepare(`UPDATE todos SET completed = NOT completed WHERE id = ?`);

    stmt.run(id, (err) => {
        if(err) {
            res.status(500).send({error: err.message});
        } else {
            res.sendStatus(200);
        }
    });

    stmt.finalize();

};

exports.deleteTask = (req, res) => {
    const {id} = req.params;

    //db.run('BEGIN TRANSACTION');

    const stmt = db.prepare(`DELETE FROM todos WHERE id = ?`);

    stmt.run(id, (err) => {
        if(err) {
            res.status(500).send({error: err.message});
        } else {
            res.sendStatus(200);
            db.run(`REINDEX todos`);
        }
    });
    stmt.finalize();
};

exports.search =  (req, res) => {
    const { keyword } = req.params;
    const term = `%${keyword}%`; // Add wildcards to search for the keyword within the task
  
    db.all(`SELECT * FROM todos WHERE task LIKE ?`, [term], (err, rows) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send(rows);
      }
    });
  };

exports.uploadFiles = (req, res) => {
    const {id} = req.params;
    const file = req.files ? req.files.files : null;
  
    if (!file) {
      res.status(400).send('No file uploaded');
      return;
    }
  
    const filePath = `./files/${file.name}`;
  
    file.mv(filePath, (err) => {
      if (err) {
        res.status(500).send({ error: err.message });
        return;
      }
  
      const stmt = db.prepare('UPDATE todos SET files = ? WHERE id = ?');
      stmt.run(filePath, id, (err) => {
        if (err) {
          res.status(500).send({ error: err.message });
        } else {
          res.sendStatus(200);
        }
        stmt.finalize();
      });
    });
  };

// Set priority for a task
exports.setPriority = (req, res) => {
    const {id} = req.params;
    const {priority} = req.body;

    db.run(`UPDATE todos SET priority = ? WHERE id = ?`, [priority, id], (err) => {
        if(err) {
            console.error(err.message);
            return res.status(500).json({error: 'Failed to update task priority'});
        }
        res.json({message: 'Task priority updated successfully.'});
    });
};

// Set due date for a task
exports.setDueDate = (req, res) => {
    const {id} = req.params;
    const {due_date} = req.body;

    db.run(`UPDATE todos SET due_date = ? WHERE id = ?`, [due_date, id], (err) => {
        if(err) {
            console.error(err.message);
            return res.status(500).json({error: 'Failed to update task due date.'});
        }
        res.json({message: 'Task due date updated successfully.'});
    });
};

exports.setLabels = (req,res) => {
    const {id} = req.params;
    const {labels} = req.body;
    const labelStr = labels.join(','); // array labels to delimeter string

    db.run(`UPDATE todos SET labels = ? WHERE id = ?`, [labelStr, id], (err) => {
        if(err) {
            console.error(err.message);
            return res.status(500).json({error: 'Failed to update task labels.'});
        }
        res.json({message: 'Task labels updated successfully.'});
    });
};