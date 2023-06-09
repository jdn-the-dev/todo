import React, { FC, useState } from 'react';
import styles from "../styles/Home.module.css";
import { task } from "../models/task";

const TasksList: FC<{ taskList: task[], setTasks: React.Dispatch<React.SetStateAction<task[]>>, setCurrentTaskID: React.Dispatch<React.SetStateAction<number>>, setInputTitle: React.Dispatch<React.SetStateAction<string>>, setInputDescription: React.Dispatch<React.SetStateAction<string>>, setEditStatus: React.Dispatch<React.SetStateAction<boolean>>}> = ({ taskList, setTasks, setCurrentTaskID, setInputTitle, setInputDescription, setEditStatus}) => {
    //Prepare the form fields to edit data that has already been inputed
    const prepareFormForEditTask = (id: number, payload: any) => {
        const {title, description} : {title: string, description: string} = payload;
    
        setInputTitle(title);
        setInputDescription(description);
        setEditStatus(true);
        setCurrentTaskID(id);
      }
    //Delete a task that is already in the task list
    const deleteTask = (id: number) => {
        setTasks((prev: any) => prev.filter((task: task) => task.id !== id));
      }
    //Toggle the checkbox to mark tasks as completed.
    const toggleCompleted = (id: number) => {

    setTasks(
        taskList.map((task: task) => {
        if(task.id === id) {
            return {...task, completed: !task.completed}
        }
        return task;
        })
    );
    }
  return (
    <>
        <div className={styles.scrollingList}>
            {taskList?.map((task: task) => (
                        <div className={styles.task_container} key={task.id}>
                            <input
                                type="checkbox"
                                className={styles.check_box}
                                checked={task.completed}
                onChange={() => {
                    toggleCompleted(task.id)
                }}
                            />
                <div className={styles.taskdata}>
                <b               
                    className={
                    task.completed
                        ? styles.task_text + " " + styles.line_through
                        : styles.task_text
                    }>{task.title}</b>
                <p
                    className={
                    task.completed
                        ? styles.task_text + " " + styles.line_through
                        : styles.task_text
                    }
                >
                    {task.description}
                </p>
                </div>

                            <button
                                className={styles.edit_task}
                onClick={() => {
                    prepareFormForEditTask(task.id, {title: task.title, description: task.description})
                }}
                            >
                                &#9998;
                            </button>
                            <button
                                className={styles.remove_task}
                onClick={() => {
                    deleteTask(task.id)
                }}
                            >
                                &#10006;
                            </button>
                        </div>
            ))}
        </div>
    </>
  );
};

export default TasksList;