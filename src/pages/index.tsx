import { useState } from "react";
import styles from "../styles/Home.module.css";
import TasksList from "../components/TasksLists";
import Form from "../components/Form";
import { task } from "../models/task";

export default function Home() {
	const [tasks, setTasks] = useState<task[]>([]);
  const [inputTitle, setInputTitle] = useState(String);
  const [inputDescription, setInputDescription] = useState(String);
  const [editStatus, setEditStatus] = useState(Boolean);
  const [currentTaskID, setCurrentTaskID] = useState(Number);
  const clearInputFields = () => {
    setInputTitle("");
    setInputDescription("");
  }


	return (
		<main className={styles.main}>
			<h1 className={styles.heading}>TO-DO</h1>
			<div className={styles.container}>
        <Form 
          taskList={tasks}
          setTasks={setTasks}
          clearInputFields={clearInputFields}
          currentTaskID={currentTaskID}
          setCurrentTaskID={setCurrentTaskID}
          inputTitle = {inputTitle}
          inputDescription={inputDescription}
          setInputTitle = {setInputTitle}
          setInputDescription = {setInputDescription}
          editStatus = {editStatus}
          setEditStatus={setEditStatus}
        />
        {tasks?.length > 0 && <div style={{color:'#000'}}>{tasks.length} item(s)</div>}
        <TasksList 
          taskList = {tasks}
          setTasks = {setTasks}
          setCurrentTaskID= {setCurrentTaskID} 
          setInputTitle = {setInputTitle}
          setInputDescription = {setInputDescription}
          setEditStatus = {setEditStatus}
        />
				{tasks?.length === 0 && <h2 className={styles.no_tasks}>No tasks</h2>}
			</div>
		</main>
	);
}