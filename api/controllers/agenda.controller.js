const Agenda = require("../models/agenda.model.js");
const app = require('../app');

/*
 * Retrieve all Agendas of student from the database.
 */
exports.findAll = (req, res) => {
	app.basicAuth(req, (err, data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		if(data.id != 1 && data.id != req.params.id) //Admin can get from all students. The student only can get from is agenda
		{
			 res.status(403).send({ message: "Access Denied." });
			 return;
		}
		
		Agenda.getAllByStudent(req.params.id, (err, data) => {
			if (err) {
				res.status(500).send({ message: err.message || "Some error occurred while retrieving Agendas." });
			}
			else {
				res.send(data);
			}
		});		
	});
};

/*
 * Find a single Agenda with a id
 */
exports.findOne = (req, res) => {
	app.basicAuth(req, (err, auth_data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		Agenda.findById(req.params.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Agenda with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: "Error retrieving Agenda with id " + req.params.id
					});
				}
			} 
			else
			{
				if(auth_data.id != 1 && auth_data.id != data.student_id)
				{
					 res.status(403).send({ message: "Access Denied." });
					 return;
				}
				
				res.send(data);
			}
		});
	});
};

/*
 * Create and Save a new Agenda
 */
exports.create = (req, res) => {
    // Validate request
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
		
		if(data.id != 1 && data.id != req.body.student_id)
		{
			 res.status(403).send({ message: "Access Denied." });
			 return;
		}

		// Create a Agenda
		const agenda = new Agenda({
			student_id: req.body.student_id,
			first_name: req.body.first_name,
			middle_name: req.body.middle_name,
			last_name: req.body.last_name,
			birth_date: req.body.birth_date,
			relationship: req.body.relationship,
			facebook_link: req.body.facebook_link,
			instagram_link: req.body.instagram_link,
			twitter_link: req.body.twitter_link,
			other_social_networ_link: req.body.other_social_networ_link,
			other_social_networ_link2: req.body.other_social_networ_link2,
			other_social_networ_link3: req.body.other_social_networ_link3,
			primary_email: req.body.primary_email,
			secundary_email: req.body.secundary_email,
			primary_address: req.body.primary_address,
			secundary_address: req.body.secundary_address,
			work_company: req.body.work_company,
			course_name: req.body.course_name,
			photo: req.body.photo,
			obs: req.body.obs,
		});

		// Save Agenda in the database
		Agenda.create(agenda, (err, data) => {
			if (err)
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the Agenda."
				});
			else res.send(data);
		});
	});
};

/*
 * Update a Agenda identified by the id in the request
 */
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
	
	
	//only owner or admin can edit
	app.basicAuth(req, (err, auth_data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		Agenda.findById(req.params.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `1Not found Agenda with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: "Error retrieving Agenda with id " + req.params.id
					});
				}
			} 
			else
			{
				if(auth_data.id != 1 && auth_data.id != data.student_id)
				{
					 res.status(403).send({ message: "Access Denied." });
					 return;
				}
				
				//All ok, update
				Agenda.updateById(
					req.params.id,
					new Agenda(req.body),
					(err, data) => {
						if (err) {
							if (err.kind === "not_found") {
								res.status(404).send({
									message: `2Not found Agenda with id ${req.params.id}.`
								});
							} else {
								res.status(500).send({
									message: "Error updating Agenda with id " + req.params.id
								});
							}
						} else res.send(data);
					}
				);
			}
		});
	});
};

/*
 * Delete a Agenda with the specified id in the request
 */
exports.delete = (req, res) => {
	
	//only owner or admin can delete
	app.basicAuth(req, (err, auth_data) => {
		if(err != null)
		{
			 res.status(403).send({ message: err.message || "Access Denied." });
			 return;
		}
		
		Agenda.findById(req.params.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Agenda with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: "Error retrieving Agenda with id " + req.params.id
					});
				}
			} 
			else
			{
				if(auth_data.id != 1 && auth_data.id != data.student_id)
				{
					 res.status(403).send({ message: "Access Denied." });
					 return;
				}
				
				Agenda.remove(req.params.id, (err, data) => {
					if (err) {
						if (err.kind === "not_found") {
							res.status(404).send({
								message: `Not found Agenda with id ${req.params.id}.`
							});
						} else {
							res.status(500).send({
								message: "Could not delete Agenda with id " + req.params.id
							});
						}
					} else res.send({ message: `Agenda was deleted successfully!` });
				});
			}
		});
	});
};
