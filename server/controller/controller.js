const db = require('../model/index')


module.exports.getChars = async (req, res) => {
    try {
        const userID = req.params.id
        res.send(await db.character.find({owner: userID}).select({ name: 1, playbook: 1, system: 1 }))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.addChar = async (req, res) => {
    try {
        const {system, playbook, name, stats, owner} = req.body
        if ([system, playbook, name, stats, owner].some((field => typeof(field) != 'string'))) {
            res.status(400);
            res.send()
        }
        const trackers_response = db.tracker.find({ system, "playbook" : { $in : ["basic", playbook]} }).select({ value: 1})
        const moves_response = db.move.find({ system, "playbook" : { $in : ["basic", playbook]} }).select({ isAvailable: 1})
        
        Promise.all([trackers_response, moves_response]).then(function([trackers, moves]) {
            const newChar = {owner, system, playbook, name, moves, trackers, stats, "charDescription": ""}
            console.log(newChar)
            db.character.create( newChar ).then((createdChar) => res.send(createdChar._id))
        })

        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.getCharById = async (req, res) => {
    try {
        const id = req.params.id
        res.send(await db.character.findById(id))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.updateChar = async (req, res) => {
    try {
        const id = req.params.id
        const update = {}
        update[req.body.updatedField] = req.body.newVal
        res.send(await db.character.findByIdAndUpdate(id, update, {new: true}))
        res.status(201);
    } catch (err) {
        console.log(err)
        res.status(400);
    }
}

module.exports.deleteChar = async (req, res) => {
    try {
        const id = req.params.id
        db.character.findByIdAndDelete(id).then(()=>{res.send('Deleted')})
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