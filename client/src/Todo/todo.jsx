import { useEffect, useState } from "react";
import "./todo.css";
import axios from "axios";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

const Todo = () => {
  const [value, setValue] = useState();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get")
      .then((result) => setTodoList(result.data))
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleAdd = () => {
    if (!value) return alert('Enter the task');
    axios
      .post("http://localhost:3001/add", { task: value })
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  const handleCheck = (id) => {
    axios
      .put("http://localhost:3001/update/" + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then(() => location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <div className="todo-container  ">
      <div className="todo-input-section">
        <h2>Task Manager</h2>
        <div className="todo-input-body">
          <TextField
            autoFocus
            required
            className="todo-input-element"
            size="small"
            sx={{
              backgroundColor: "#fff",
              width: "100%",
              maxwidth: "300px",
              minWidth: "100px",
            }}
            name="todo-input"
            onChange={handleChange}
            value={value}
            placeholder="add new task here..."
          ></TextField>
          <Button onClick={handleAdd} size="small" variant="contained">
            Add
          </Button>
        </div>
      </div>
      <div className="todo-list-section">
        <div className="todo-item-container">
          <ol className="todo-items-body">
            {todoList.map((eachTask) => {
              return (
                <div key={eachTask._id} className="todo-list-item">
                  <Checkbox
                    checked={eachTask.done}
                    size="small"
                    sx={{}}
                    color="success"
                    onChange={() => handleCheck(eachTask._id)}
                  />
                  <li key={eachTask.id} className="todo-item-value">
                    {eachTask.task}
                  </li>
                  <IconButton onClick={() => handleDelete(eachTask._id)}>
                    <DoDisturbOnIcon color="error" size="small" />
                  </IconButton>
                </div>
              );
            })}
          </ol>
        </div>
        <marquee width="100%" direction="left" height="30px">
        *You may delay, but time will not. - Benjamin Franklin.   The best way to
          get something done is to begin. - Abdul.    Productivity is being able
          to do things that you were never able to do before. - Franz Kafka*
        </marquee>
      </div>
    </div>
  );
};

export default Todo;
