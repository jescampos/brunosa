const sql = require("./db.js");

// constructor
const Student = function (student) {
    this.id = student.id;
    this.student_number = student.student_number;
    this.name = student.name;
    this.mobile_phone = student.mobile_phone;
    this.email = student.email;
    this.authentication_code = student.authentication_code;
    this.confirmed = student.confirmed;
    this.photo = student.photo;
};

Student.getAll = result => {

    sql.query("SELECT * FROM students", (err, res) => {

        if (err) {
            result(null, err);
            return;
        }

        console.log("students: ", res);
        result(null, res);
    });
};

Student.findById = (id, result) => {
    sql.query(`SELECT * FROM students WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found student: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Student with the id
        result({ kind: "not_found" }, null);
    });
};

Student.signIn = (studentCredetials, result) => {
    const query = `SELECT * FROM students WHERE confirmed = 1 AND student_number = "${studentCredetials.student_number}" AND authentication_code = "${studentCredetials.authentication_code}"`;
    sql.query(query,
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
			
            if (res.length) {
                console.log("student match found");
                result(null, res[0]);
                return;
            }

            // not found Student with the match
			console.log("student NOT found");
            result({ kind: "not_found" }, null);
        });
};

Student.create = (newStudent, result) => {
	newStudent.authentication_code = Math.floor(Math.random() * (10000 - 1000) + 1000);
    sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created student: ", { id: res.insertId, ...newStudent });
        result(null, { id: res.insertId, ...newStudent });
    });
};

Student.updateById = (studentId, student, result) => {
    sql.query(
        "UPDATE students SET name = ?, mobile_phone = ?, authentication_code = ?, photo = ? WHERE id = ?",
		
        [student.name, student.mobile_phone, student.authentication_code, student.photo, studentId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Student with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated student: ", { id: studentId, ...student });
            result(null, { id: studentId, ...student });
        }
    );
};

Student.remove = (studentId, result) => {
    sql.query("DELETE FROM students WHERE id = ?", studentId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Student with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted student with id: ", studentId);
        result(null, res);
    });
};

Student.confirmStudent = (studentId, result) => {
    sql.query("UPDATE students SET confirmed = 1 WHERE id = ?", studentId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Student with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("confirmed student with id: ", studentId);
        result(null, res);
    });
};

module.exports = Student;