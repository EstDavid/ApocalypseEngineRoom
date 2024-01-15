const db = require('../model/index')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getUser = async (req, res) => {
    try {
        const {username, password} = req.body
        if ([username, password].some((field =>! (field && typeof(field) == 'string')))) {
            res.status(400);
            res.send('Wrong connection details')
        }
         
        db.user.findOne({name: username}).then((user) => {
            if (!user) {
                res.send('Wrong connection details');
                res.status(500);
            } else {
                bcrypt.compare(password, user.password,  (err, result) => {
                if (result == true) {
                   res.status(200);
                   res.cookie('userID', user._id);
                   res.send(user._id);
                } else {
                    res.send('Wrong connection details');
                    res.status(500);
               }
             });
            }
        });
     
        res.status(200);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}


module.exports.addUser = async (req, res) => {
    try {
        const {username, password} = req.body
        if ([username, password].some((field => typeof(field) != 'string'))) {
            res.status(400);
            res.send()
        }

        db.user.findOne({name: username}).then((user) => {
            if (!user) {
                bcrypt.hash(password, saltRounds, (err,   hash) => {
                    db.user.create({
                        name: username,
                        password: hash
                    }).then((createdUser) => {
                        res.cookie('userID', createdUser._id);
                        res.send(createdUser._id);
                    })
                });
            } else {
                res.send('User Already exists');
                res.status(500);
            }
        });
        
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('userID');
        res.send('cookie cleared');
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.getChars = async (req, res) => {
    try {
        const userID = req.cookies.userID
        if (! userID) {throw('Bad Credendials')}
        res.send(await db.character.find({owner: userID}).select({ name: 1, playbook: 1, system: 1 }))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.addChar = async (req, res) => {
    try {
        const userID = req.cookies.userID
        if (! userID) {throw('Bad Credendials')}

        const {system, playbook, name, stats} = req.body
        if ([system, playbook, name].some((field => typeof(field) != 'string'))) {
            throw('Bad Input')
        }
        const trackers_response = db.tracker.find({ system, "playbook" : { $in : ["basic", playbook]} }).select({ value: 1})
        const moves_response = db.move.find({ system, "playbook" : { $in : ["basic", playbook]} }).select({ isAvailable: 1})
        
        Promise.all([trackers_response, moves_response]).then(function([trackers, moves]) {
            const newChar = {owner: userID,
                system, 
                playbook, 
                name, 
                moves, 
                trackers, 
                stats, 
                "charDescription": ""
            }
            db.character.create( newChar ).then((createdChar) => res.send(createdChar._id))
        })
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.getCharById = async (req, res) => {
    try {
        const id = req.params.id
        const userID = req.cookies.userID
        if (! userID) {throw('Bad Credendials')}

        res.send(await db.character.findOne({_id: id, owner: userID}))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.updateChar = async (req, res) => {
    try {
        const id = req.params.id

        const userID = req.cookies.userID
        if (! userID) {throw('Bad Credendials')}

        const update = {}
        update[req.body.updatedField] = req.body.newVal

        res.send(await db.character.findOneAndUpdate({_id: id, owner: userID}, update, {new: true}))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.deleteChar = async (req, res) => {
    try {
        const id = req.params.id
        const userID = req.cookies.userID
        if (! userID) {throw('Bad Credendials')}

        db.character.findOneAndDelete({_id: id, owner: userID}).then(()=>{res.send('Deleted')})
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.getMoves = async (req, res) => {
    try {
        const system = req.params.system
        const playbook = req.params.playbook
        res.send(await db.move.find({ system, "playbook" : { $in : ["basic", playbook]} }))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.getTrackers = async (req, res) => {
    try {
        const system = req.params.system
        const playbook = req.params.playbook
        res.send(await db.tracker.find({ system, "playbook" : { $in : ["basic", playbook]} }))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.getPlaybook = async (req, res) => {
    try {
        const systemName = req.params.system
        const name = req.params.playbook
        res.send(await db.playbook.findOne({systemName, name}))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.getPlaybooks = async (req, res) => {
    try {
        res.send(await db.playbook.find({}).select({ name: 1, systemName: 1, statsOptions: 1, statOptionsText: 1, description: 1}))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}