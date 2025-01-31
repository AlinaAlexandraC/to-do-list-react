import "./ToDoItem.css";
import editTaskImg from "../../assets/edit.svg";
import removeTaskImg from "../../assets/delete.svg";
import saveImg from "../../assets/save.svg";

const ToDoItem = ({ index, task, removeTask, editTask, isEditing, editedTaskValue, updateTask, setEditedTaskValue, markAsComplete }) => {
    return (
        <div className="to-do-item-container">
            <div className={`to-do-item ${task.isChecked ? 'completed' : ''}`}>
                <div className="to-do-item-task">
                    <input type="checkbox" id={`task-${index}`} name={`task-${index}`} value={task.task} checked={task.isChecked} onChange={(e) => markAsComplete(index, e)} />
                    {isEditing ? (
                        <input type="text" className="edit-input" value={editedTaskValue} onChange={(e) => setEditedTaskValue(e.target.value)} />
                    ) : (
                        <label htmlFor={`task-${index}`}>{task.task}</label>
                    )}
                </div>
                <div className="to-do-item-buttons">
                    {isEditing ? (
                        <div className="to-do-item-save" onClick={updateTask} >
                            <img src={saveImg} alt="save-task" />
                        </div>
                    ) : (
                        <div className="to-do-item-edit" onClick={() => editTask(task, index)}>
                            <img src={editTaskImg} alt="edit-task" />
                        </div>)
                    }
                    <div className="to-do-item-delete" onClick={() => removeTask(index)}>
                        <img src={removeTaskImg} alt="delete-task" />
                    </div>
                </div>
            </div>
            <label htmlFor={`task-${index}`} className="to-do-item-label">
                {task.inputError && <span className="input-error">{task.inputError}</span>}
            </label>
        </div>
    );
};

export default ToDoItem;