import "./ToDoList.css";
import ToDoItem from "../ToDoItem/ToDoItem";
import { useEffect, useState } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState("");
    const [editingTaskIndex, setEditingTaskIndex] = useState(null);
    const [editedTaskValue, setEditedTaskValue] = useState("");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    // TODO: make it look good on mobile

    const addTask = () => {
        const regex = /^(?!\d+$).+/;
        if (inputValue === "" || !(regex.test(inputValue))) {
            setInputError("Task cannot be empty or just numbers");
            setTimeout(() => {
                setInputError("");
            }, 3000);
            return;
        }

        const newTask = { id: Date.now(), task: inputValue, isChecked: false, inputError: "" };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setInputValue("");
        setInputError("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    const removeTask = (taskIndex) => {
        const updatedTasks = tasks.filter((task, index) => index !== taskIndex);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const markAsComplete = (taskIndex, e) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].isChecked = e.target.checked;
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const editTask = (taskToEdit, index) => {
        setEditingTaskIndex(index);
        setEditedTaskValue(taskToEdit.task);
    };

    const updateTask = () => {
        if (editedTaskValue.trim() && editedTaskValue !== tasks[editingTaskIndex].task) {
            const regex = /^(?!\d+$).+/;
            const updatedTasks = [...tasks];

            if (editedTaskValue === "" || !(regex.test(editedTaskValue))) {
                updatedTasks[editingTaskIndex] = {
                    ...updatedTasks[editingTaskIndex],
                    inputError: "Task cannot be just numbers"
                };

                setTasks(updatedTasks);

                setTimeout(() => {
                    setTasks(prevTasks => {
                        const tempTasks = [...prevTasks];
                        tempTasks[editingTaskIndex] = {
                            ...tempTasks[editingTaskIndex],
                            inputError: ""
                        };
                        return tempTasks;
                    });
                }, 3000);

                return;
            }

            updatedTasks[editingTaskIndex].task = editedTaskValue;
            updatedTasks[editingTaskIndex].inputError = "";
            setTasks(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }

        setEditingTaskIndex(null);
        setEditedTaskValue("");
    };

    return (
        <div className="to-do-list-container">
            <div className="to-do-list-title">To Do List</div>
            <div className="to-do-list-input-bar">
                <input type="text" className="to-do-list-input" value={inputValue} onChange={handleInputChange} placeholder="Add your task here" onKeyDown={handleKeyDown} />
                <div className="to-do-list-submit" onClick={addTask} >Add</div>
            </div>
            <label htmlFor="to-do-list-input-bar" className="to-do-list-input-bar-label">{inputError}</label>
            <div className="tasks-container" style={{ overflowX: "auto" }}>
                {tasks.length > 0 && tasks.map((task, index) => (
                    <ToDoItem key={index} index={index} task={task} removeTask={removeTask} editTask={editTask} isEditing={editingTaskIndex === index} editedTaskValue={editedTaskValue} updateTask={updateTask} setEditedTaskValue={setEditedTaskValue} markAsComplete={markAsComplete} />
                ))}
            </div>
        </div>
    );
};

export default ToDoList;