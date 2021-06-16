var express = require('express');
var router = express.Router();
const agendaController = require("../controllers/agenda.controller.js");

// GET all agenda of student
router.get('/:id', function (req, res, next) {
  agendaController.findAll(req, res);
});

// Get a single agenda by Id
router.get('/get/:id', function (req, res, next) {
  agendaController.findOne(req, res);
});

// Create a new agenda
router.post('/', function (req, res, next) {
  agendaController.create(req, res);
});

// Update agenda
router.put('/:id', function (req, res, next) {
  agendaController.update(req, res);
});

// Delete aagenda
router.delete('/:id', function (req, res, next) {
  agendaController.delete(req, res);
});

module.exports = router;
