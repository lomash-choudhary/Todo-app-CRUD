const express = require("express")
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const uuid = require("uuid");

app.use(bodyParser.json());

const todos = [{
  id: 1,
  description: "Go to School",
  status: false
},{
  id: 2,
  description: "Complete The Cohort Assignment",
  status : true
},{
  id: 3,
  description: "Go To GYM",
  status: false
}]

app.get('/', (req,res) => {
  res.send("Home-Page-Todo-App");
})

app.get('/todos', (req,res) => {
  res.json(todos);
})

app.post('/todos', (req,res) => {
  const body = req.body;
  todos.push({
    id: uuid.v4(),
    ...body
  })
  res.json(todos);
})

app.put('/todos/:id', (req,res) => {
  const update_todo = todos.find(todo => req.params.id == todo.id)
  if(update_todo) {
    update_todo.description = req.body.description
    update_todo.status = req.body.status
    res.json(todos);
  }
  else{
    res.send("The Given Id is Wrong");
  }
})

app.delete("/todos/:id", (req,res) => {
  const id_del_todo = req.params.id;
  for(let i = 0; i < todos.length; i++){
    if(todos[i].id == id_del_todo){
      todos.splice(i,1)
    }
  }
  res.json(todos);
})

app.listen(port, () => {
  console.log("App is listening on PORT:",port);
})