import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Edad, setEdad] = useState(0);
  const [Correo, setCorreo] = useState("");
  const [nuevaEdad, setNuevaEdad] = useState(0);
  const [boolean, setBoolean] = useState(true);
  const [msj, setMsj] = useState("Show Employees");
  const [employeList, setEmployeeList] = useState([]);
  const [nuevoCorreo, setNuevoCorreo] = useState("");

  function mandaSolicitud() {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Apellido: Apellido,
      Edad: Edad,
      Correo: Correo,
    });
  }
  // quiero llamar a una función si algo pasa dentro del código.

  function getEmployees() {
    Axios.get("http://localhost:3001/show").then((response) => {
      setEmployeeList(response.data);

      if (boolean === false) {
        setBoolean(true);
      } else setBoolean(false);

      if (msj === "Show Employees") {
        setMsj("Hide Employees");
      } else setMsj("Show Employees");
    });
  }

  function updateEmployee(EmployeeID) {
    Axios.put("http://localhost:3001/update", {
      EmployeeID: EmployeeID,
      Edad: nuevaEdad,
    }).then((response) => {
      setEmployeeList(
        employeList.map((val) => {
          return val.EmployeeID === EmployeeID
            ? {
                EmployeeID: val.EmployeeID,
                Nombre: val.Nombre,
                Apellido: val.Apellido,
                Edad: nuevaEdad,
                Correo: val.Correo,
              }
            : val;
        })
      );
    });
  }

  function updateEmployeeMail(EmployeeID) {
    Axios.put("http://localhost:3001/updateCorreo", {
      Correo: nuevoCorreo,
      EmployeeID: EmployeeID,
    }).then((response) => {
      setEmployeeList(
        employeList.map((val) => {
          return val.EmployeeID === EmployeeID
            ? {
                EmployeeID: val.EmployeeID,
                Nombre: val.Nombre,
                Apellido: val.Apellido,
                Edad: val.Edad,
                Correo: nuevoCorreo,
              }
            : val;
        })
      );
    });
  }

  function erraseEmployee(EmployeeID) {
    Axios.delete(`http://localhost:3001/delete/${EmployeeID}`).then(
      (response) => {
        setEmployeeList(
          employeList.filter((val) => {
            return val.EmployeeID !== EmployeeID;
          })
        );
      }
    );
  }

  return (
    <div className="app">
      <div className="information">
        <label>Name(s)</label>
        <input
          type={"text"}
          onChange={(e) => {
            setNombre(e.target.value);
          }}
        ></input>
        <label>Last Name</label>
        <input
          type={"text"}
          onChange={(e) => {
            setApellido(e.target.value);
          }}
        ></input>
        <label>Age</label>
        <input
          type={"number"}
          onChange={(e) => {
            setEdad(e.target.value);
          }}
        ></input>
        <label>Mail</label>
        <input
          type={"text"}
          onChange={(e) => {
            setCorreo(e.target.value);
          }}
        ></input>
        <button onClick={mandaSolicitud}>Add Employee</button>
      </div>
      <hr />
      <div className="information">
        <button onClick={getEmployees}>{msj}</button>
        {employeList.map((val, key) => {
          return (
            <div
              style={{ display: boolean ? "none" : "block" }} // true y false
              className="employeeTable"
              key={val.EmployeeID}
            >
              <div>
                <h3>Name(s): {val.Nombre} </h3>
                <h3>Last Name: {val.Apellido} </h3>
                <h3>Age: {val.Edad} </h3>
                <h3>Mail: {val.Correo}</h3>
              </div>
              <div className="cuadrito">
                <input
                  className="input"
                  type={"text"}
                  placeholder="Change Age"
                  onChange={(e) => {
                    setNuevaEdad(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateEmployee(val.EmployeeID);
                  }}
                >
                  Change Age
                </button>

                <input
                  className="input"
                  type={"text"}
                  placeholder="Change Mail"
                  onChange={(e) => {
                    setNuevoCorreo(e.target.value);
                  }}
                ></input>
                <button
                  onClick={() => {
                    updateEmployeeMail(val.EmployeeID);
                  }}
                >
                  Change Mail
                </button>
                <button
                  onClick={() => {
                    erraseEmployee(val.EmployeeID);
                  }}
                >
                  <img
                    className="basura"
                    src="/trashcan.png"
                    alt="borrar"
                  ></img>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
