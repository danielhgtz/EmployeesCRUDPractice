import express from "express";
const app = express();
// import mysql from "mysql";
import cors from "cors";
import mysql from "mysql2";

app.use(cors());
app.use(express.json());

// const pool = mysql
//   .createPool({
//     user: "root",
//     host: "localhost",
//     password: "Lizzie123*",
//     database: "employees",
//   })
//   .promise();

// const result = await pool.query("SELECT * FROM employees.`employee(s)`");

// console.log(result);

//////////////////////////////////////////
const pool = mysql.createConnection({
  //Especificas la ubicación de la conexión [el usuario, el host, la contraseña y el nombre del SCHEMA no de la base de datos]
  user: "root",
  host: "localhost",
  password: "Lizzie123*",
  database: "employees",
});

app.post("/create", (req, res) => {
  // Los llamas al back
  const Nombre = req.body.Nombre;
  const Apellido = req.body.Apellido;
  const Edad = req.body.Edad;
  const Correo = req.body.Correo;

  pool.query(
    // y los insertas en la base de datos
    "INSERT INTO `employee(s)` (Nombre, Apellido, Edad, Correo) VALUES (?,?,?,?)", //cuando se utilizan carácteres especiales para nombres el nombre de la tabla se utiliza `` backticks
    [Nombre, Apellido, Edad, Correo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted" + result);
      }
    }
  );
});

app.get("/show", (req, res) => {
  pool.query("SELECT * FROM employees.`employee(s)`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const EmployeeID = req.body.EmployeeID;
  const Edad = req.body.Edad;
  pool.query(
    "UPDATE `employee(s)` SET Edad = ? WHERE EmployeeID = ?",
    [Edad, EmployeeID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateCorreo", (req, res) => {
  const Correo = req.body.Correo;
  const EmployeeID = req.body.EmployeeID;
  pool.query(
    "UPDATE `employee(s)` SET Correo = ? WHERE EmployeeID = ?",
    [Correo, EmployeeID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:EmployeeID", (req, res) => {
  const EmployeeID = req.params.EmployeeID;

  pool.query(
    "DELETE FROM `employee(s)` WHERE EmployeeID = ?",
    EmployeeID,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  //servidor para que corra
  console.log("running");
});

/*const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "employees",
});

app.post("/create", (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const edad = req.body.edad;
  const correo = req.body.correo;

  db.query(
    "INSERT INTO employee(s) (nombre, apellido, edad, correo) VALUES (?,?,?,?)",
    [nombre, apellido, edad, correo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
*/
