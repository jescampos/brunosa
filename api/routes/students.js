var express = require('express');
var router = express.Router();
const studentController = require("../controllers/students.controller.js");

// GET all Students
router.get('/', function (req, res, next) {
  studentController.findAll(req, res);
});

// Get a single student by Id
router.get('/:id', function (req, res, next) {
  studentController.findOne(req, res);
});

// Verify Sign In for Username and Password
router.post('/signIn', function (req, res, next) {
  studentController.signIn(req, res);
});

// Create a new User
router.post('/', function (req, res, next) {
  studentController.create(req, res);
});

// Update a User
router.put('/:id', function (req, res, next) {
  studentController.update(req, res);
});

// Delete a User
router.delete('/:id', function (req, res, next) {
  studentController.delete(req, res);
});

// Cofirm a User
router.post('/confirmStudent/:id', function (req, res, next) {
  studentController.confirmStudent(req, res);
});

module.exports = router;
