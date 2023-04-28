import React, { FC, useState } from 'react';
import styles from "../styles/Home.module.css";
import { task } from "../models/task";
//Component to handle user inputs via a Form
const Form: FC<{taskList: task[], setTasks:React.Dispatch<React.SetStateAction<task[]>> ,clearInputFields: any, currentTaskID: number, setCurrentTaskID: React.Dispatch<React.SetStateAction<number>>, inputTitle:string, setInputTitle:React.Dispatch<React.SetStateAction<string>>, inputDescription:string, setInputDescription:React.Dispatch<React.SetStateAction<string>>, editStatus:boolean, setEditStatus:React.Dispatch<React.SetStateAction<boolean>>}> = ({ taskList, setTasks,clearInputFields, currentTaskID, setCurrentTaskID, inputTitle, setInputTitle, inputDescription, setInputDescription, editStatus, setEditStatus }) => {
  //Add a task to the task list
  const addTask = (e: any) => {
      e.preventDefault();
      const newTask: task = {
        id: Date.now(),
        title: inputTitle,
        description: inputDescription,
        completed: false,
      }
      setTasks([...taskList, newTask]);
      clearInputFields();
    };
  //Edit a task that is already in the task list
  const editTask = (e: any) => {
    const id = currentTaskID;
    e.preventDefault();
    const originalTasks = [...taskList];
    const index = originalTasks.findIndex((t) => t.id === id);
    originalTasks[index].title = inputTitle;
    originalTasks[index].description = inputDescription;
    
    setTasks(originalTasks);
    clearInputFields();
    setEditStatus(false);
    setCurrentTaskID(Number);

  };
  return (
    <>
	    <form onSubmit={editStatus ? editTask : addTask} className={styles.form_container}>
            <input
              className={styles.input}
              type="text"
              placeholder="Title"
              onChange={(event) => {
                setInputTitle(event.target.value);
              }}
              value={inputTitle}
              required
              maxLength={15}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Description"
              onChange={(event) => {
                setInputDescription(event.target.value);
              }}
              value={inputDescription}
              required
            />

            <button type="submit" className={styles.submit_btn}>
                {editStatus ? "Update" : "Add"}
            </button>
		</form>
    </>
  );
};

export default Form;