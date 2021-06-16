const sql = require("./db.js");

// constructor
const Agenda = function (agenda) {
    this.id = agenda.id;
	
	this.student_id = agenda.student_id,
	this.first_name = agenda.first_name,
	this.middle_name = agenda.middle_name,
	this.last_name = agenda.last_name,
	this.birth_date = agenda.birth_date,
	this.relationship = agenda.relationship,
	this.facebook_link = agenda.facebook_link,
	this.instagram_link = agenda.instagram_link,
	this.twitter_link = agenda.twitter_link,
	this.other_social_networ_link = agenda.other_social_networ_link,
	this.other_social_networ_link2 = agenda.other_social_networ_link2,
	this.other_social_networ_link3 = agenda.other_social_networ_link3,
	this.primary_email = agenda.primary_email,
	this.secundary_email = agenda.secundary_email,
	this.primary_address = agenda.primary_address,
	this.secundary_address = agenda.secundary_address,
	this.work_company = agenda.work_company,
	this.course_name = agenda.course_name,
	this.photo = agenda.photo,
	this.obs = agenda.obs
    
};

Agenda.getAllByStudent = (student_id, result) => {

    sql.query(`SELECT * FROM agenda where student_id = ${student_id}`, (err, res) => {

        if (err) {
            result(null, err);
            return;
        }

        console.log("students Agenda: ", res);
        result(null, res);
    });
};

Agenda.findById = (agendaId, result) => {
    sql.query(`SELECT * FROM agenda WHERE Id = ${agendaId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found agenda: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Agenda with the id
        result({ kind: "not_found" }, null);
    });
};

Agenda.create = (newAgenda, result) => {
    sql.query("INSERT INTO agenda SET ?", newAgenda, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created agenda: ", { Id: res.insertId, ...newAgenda });
        result(null, { Id: res.insertId, ...newAgenda });
    });
};

Agenda.updateById = (agendaId, agenda, result) => {
    sql.query(
        "UPDATE agenda SET first_name = ?, middle_name = ?, last_name = ?, birth_date = ?, relationship = ?, facebook_link = ?, instagram_link = ?, twitter_link = ?, other_social_networ_link = ?, other_social_networ_link2 = ?, other_social_networ_link3 = ?, primary_email = ?, secundary_email = ?, primary_address = ?, secundary_address = ?, work_company = ?, course_name = ?, photo = ?, obs = ? WHERE id = ?",
        [agenda.first_name, agenda.middle_name, agenda.last_name, agenda.birth_date, agenda.relationship, agenda.facebook_link, agenda.instagram_link, agenda.twitter_link, agenda.other_social_networ_link, agenda.other_social_networ_link2, agenda.other_social_networ_link3, agenda.primary_email, agenda.secundary_email, agenda.primary_address, agenda.secundary_address, agenda.work_company, agenda.course_name, agenda.photo, agenda.obs, agendaId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Agenda with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated agenda: ", { agendaId: agendaId, ...agenda });
            result(null, { agendaId: agendaId, ...agenda });
        }
    );
};

Agenda.remove = (agendaId, result) => {
    sql.query("DELETE FROM agenda WHERE Id = ?", agendaId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Agenda with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted agenda with Id: ", agendaId);
        result(null, res);
    });
};

module.exports = Agenda;