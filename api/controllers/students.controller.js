const Student = require("../models/student.model.js");
const app = require('../app');

/*
 * Credits: https://bezkoder.com/node-js-rest-api-express-mysql/
 */

/*
 * Retrieve all Students from the database.
 */
exports.findAll = (req, res) => {
	app.basicAuth(req, (err, data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		if(data.id != 1) //The admin ID is 1!!!!
		{
			 res.status(403).send({ message: "Access Denied." });
			 return;
		}
		
		Student.getAll((err, data) => {
			if (err) {
				res.status(500).send({ message: err.message || "Some error occurred while retrieving Students." });
			}
			else {
				res.send(data);
			}
		});		
	});
};

/*
 * Find a single Student with a id
 */
exports.findOne = (req, res) => {
	app.basicAuth(req, (err, data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		if(data.id != 1 && data.id != req.params.id)
		{
			 res.status(403).send({ message: "Access Denied." });
			 return;
		}
		
		Student.findById(req.params.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Student with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: "Error retrieving Student with id " + req.params.id
					});
				}
			} else res.send(data);
		});
	});
};

/*
 * Sign In
 */
exports.signIn = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Student Sign In
    const student = new Student({
        student_number: req.body.student_number,
        authentication_code: req.body.authentication_code
    });
	
    // Verify data
    Student.signIn(student, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Student not found with this credentials`
                });
            } else {
                res.status(500).send({
                    message: "Some error occurred while signing in the Student."
                });
            }
        }
        else {
            res.send(data);
        }
    });
};

/*
 * Create and Save a new Student
 */
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Student
    const student = new Student({
		//id: req.body.id,
		student_number: req.body.student_number,
		name: req.body.name,
		mobile_phone: req.body.mobile_phone,
		email: req.body.email,
		authentication_code: req.body.authentication_code,
		confirmed: "0",
		photo: req.body.photo
    });

    // Save Student in the database
    Student.create(student, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        else res.send(data);
    });
};

/*
 * Update a Student identified by the id in the request
 */
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
	
	app.basicAuth(req, (err, data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		if(data.id != 1 && data.id != req.params.id)
		{
			 res.status(403).send({ message: "Access Denied." });
			 return;
		}

		Student.updateById(
			req.params.id,
			new Student(req.body),
			(err, data) => {
				if (err) {
					if (err.kind === "not_found") {
						res.status(404).send({
							message: `Not found Student with id ${req.params.id}.`
						});
					} else {
						res.status(500).send({
							message: "Error updating Student with id " + req.params.id
						});
					}
				} else res.send(data);
			}
		);
	});
};

/*
 * Delete a Student with the specified id in the request
 */
exports.delete = (req, res) => {
	app.basicAuth(req, (err, data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		if(data.id != 1) //Only admin can delete students
		{
			 res.status(403).send({ message: "Access Denied." });
			 return;
		}
		
		Student.remove(req.params.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Student with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: "Could not delete Student with id " + req.params.id
					});
				}
			} else res.send({ message: `Student was deleted successfully!` });
		});
	});
};

/*
 * Confirm Student with the specified id in the request
 */
exports.confirmStudent = (req, res) => {
	app.basicAuth(req, (err, data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		if(data.id != 1) //Only admin can confirm students
		{
			 res.status(403).send({ message: "Access Denied." });
			 return;
		}
		
		Student.confirmStudent(req.params.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Student with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: "Could not confirm Student with id " + req.params.id
					});
				}
			} else res.send({ message: `Student was confirmed successfully!` });
		});
	});
};