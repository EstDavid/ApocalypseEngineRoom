const express = require('express')
const router = express.Router()
const controller = require('./controller/controller')

router.get('/characters/:id', controller.getChars)
router.post('/characters', controller.addChar)
router.get('/character/:id', controller.getCharById)
router.post('/character/:id', controller.updateChar)
router.delete('/character/:id', controller.deleteChar)
router.get('/moves/:system/:playbook', controller.getMoves)
router.get('/trackers/:system/:playbook', controller.getTrackers)
router.get('/playbook/:system/:playbook', controller.getPlaybook)
router.get('/playbooks/', controller.getPlaybooks)

module.exports = router