import React, { useEffect, useState } from "react";
import "../homepage.css";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function Todos() {
  const [todoslist, setTodoslist] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [newTodos, setNewTodos] = useState({
    todos: "",
    status: "",
    priority: "",
  });
  const [todotag, setTodostag] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [todotagUpdater, setTodostagUpdater] = useState("");
  const [statusUpdater, setStatusUpdater] = useState("");
  const [priorityUpdater, setPriorityUpdater] = useState("");

  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("http://localhost:9000/todosManagement").then((res) => {
      console.log(res.data);
      setTodoslist(res.data);
    });
  }, [refresh]);

  const addTodo = (e) => {
    e.preventDefault(); //This is used for preventing page refresh
    const body = {
      todo: todotag,
      status: status,
      priority: priority,
    };
    axios
      .post("http://localhost:9000/todosManagement/createtodos", body)
      .then((res) => {
        // alert(res.data.message);
        console.log(res.data);
        console.log(res.data.message);
        setRefresh(!refresh);
        // setTodoslist(res.data.todo);
        //   history.push("/");
      });
    console.log(newTodos);
    setTodostag("");
    setStatus("");
    setPriority("");
  };

  const handleUpdate = () => {
    const body = {
      todo: todotagUpdater,
      status: statusUpdater,
      priority: priorityUpdater,
    };

    console.log(`${id}`);
    axios
      .patch(`http://localhost:9000/todosManagement/Todosupdate/${id}`, body)
      .then((res) => {
        console.log(res.data.message);
        setRefresh(!refresh);
        setTodostagUpdater("");
        setStatusUpdater("");
        setPriorityUpdater("");
        handleClose();
      });
  };
  const deleteTodo = (id) => {
    // console.log(idd);
    axios
      .delete(`http://localhost:9000/todosManagement/deletetodos/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setRefresh(!refresh);
      });
  };

  return (
    <div className="todos-container">
      <form className="">
        <h1>Create Todos</h1>
        <div className="todos-field">
          <input
            value={todotag}
            placeholder="Todos"
            onChange={(e) => setTodostag(e.target.value)}
            type="text"
          />
        </div>
        <div className="todos-field">
          <input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            type="text"
          />
        </div>
        <div className="todos-field">
          <input
            placeholder="Priotity"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            type="text"
          />
        </div>
        <div className="todos-field">
          <button className="btn-todos" type="submit" onClick={addTodo}>
            Add Todo
          </button>
        </div>
      </form>

      <div className="table-title">
        <h1>Todos List</h1>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Todos</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Update Todo</th>
              <th>Delete Todo</th>
            </tr>
          </thead>
          <tbody>
            {todoslist.map((item) => (
              <tr>
                <th>{item.todo}</th>
                <th>{item.status}</th>
                <th>{item.priority}</th>
                <th>
                  <button
                    className="btn-update-delete"
                    type="submit"
                    onClick={(e) => {
                      setId(item._id);
                      handleClickOpen();
                    }}
                  >
                    Update
                  </button>
                </th>
                <th>
                  <button
                    className="btn-update-delete btn-todos-cancel-delete"
                    type="submit"
                    onClick={(e) => deleteTodo(item._id)}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Todos</DialogTitle>
        <DialogContent>
          <form>
            <h1>Update Todos</h1>
            <div className="todos-field">
              <input
                value={todotagUpdater}
                placeholder="Todos"
                onChange={(e) => setTodostagUpdater(e.target.value)}
                type="text"
              />
            </div>
            <div className="todos-field">
              <input
                placeholder="Status"
                value={statusUpdater}
                onChange={(e) => setStatusUpdater(e.target.value)}
                type="text"
              />
            </div>
            <div className="todos-field">
              <input
                placeholder="Priotity"
                value={priorityUpdater}
                onChange={(e) => setPriorityUpdater(e.target.value)}
                type="text"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* <dialog className="update_form">
        
      </dialog> */}
    </div>
  );
}

export default Todos;
