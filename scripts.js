var express = require("express");
var app = express();
var data = require("./database.json");

app.use(express.json());

app.get("/employees", (req, res) => {
  if (!data) {
    res.status(404).send("Could not find information");
  }
  res.send(data);
});

app.get("/employees/:id", (req, res) => {
  const findEmployee = data.employees.find((employee) => {
    return parseInt(req.params.id) === employee.id;
  });
  if (!findEmployee) {
    res.status(404).send("Could not find employee"); 
  }
  res.send(findEmployee);
});

app.post("/employees", (req, res) => {
  if (res.error) {
    res.status(400).send(res.error.details[0].message);
    return;
  }

  const newEmployee = {
    id: data.employees.length + 1,
    name: req.body.name,
    salary: req.body.salary,
    department: req.body.department,
  };
  if (!newEmployee) {
    res.status(404).send("Could not find information");
  }

  data.employees.push(newEmployee);

  res.send(newEmployee);
  return;
});

app.put("/employees/:id", (req, res) => {
  const findEmployee = data.employees.find((employee) => {
    return parseInt(req.params.id) === employee.id;
  });
  if (!findEmployee) {
    res.status(404).send("Could not find employee");
  }

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  findEmployee.name = req.body.name;
  findEmployee.salary = req.body.salary;
  findEmployee.department = req.body.department;
  res.send(findEmployee);
});

app.delete("/employees/:id", (req, res) => {
  const findEmployee = data.employees.find((employee) => {
    return parseInt(req.params.id) === employee.id;
  });
  if (!findEmployee) {
    res.status(404).send("Could not find employee");
  }

  const index = data.employees.indexOf(findEmployee);
  data.employees.splice(index, 1);

  res.send(findEmployee);
});

const port = process.env.PORT || 2000;

app.listen(2000);
