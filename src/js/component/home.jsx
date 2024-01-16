import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { number } from "prop-types";

//create your first component
const Home = () => {
	const [taskStatus, setTaskStatus] = useState("toDo");
	const [task, setTask] = useState([]);
	const [inputValue, setInputValue] = useState("")


	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};



	const handleSubmit = (event) => {
		event.preventDefault();
		if (inputValue.trim() !== "") {
			setTask([...task, {id: Date.now(), text: inputValue, completed: false}]);
			setInputValue("");
		}
	};

	const toggleTaskCompletion = (taskId) => {
		setTask(task.map(item =>
			item.id === taskId ? { ...item, completed: !item.completed } : item
		))
	};

	const deleteTask = (taskId) => {
		setTask(task.filter(task => task.id !== taskId));
	};

	const noMarkedAsIncomplete = () => {
		const uncompletedTasks = task.filter(item => !item.completed).length;
		return uncompletedTasks === 0 ? "Add a couple of tasks here!" : uncompletedTasks;
	}
	

	const noMarkedAsCompleted = () => {
		const completedTasks = task.filter(item => item.completed).length;
		return completedTasks === 0 ? "You're all caught up" : completedTasks;
	}

	return (
		<div className="text-center">
			<div>
				<h1>
					This is your to-do list
				</h1>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<input 
					placeholder="Add your tasks here" 
					value={inputValue} 
					onChange={handleInputChange}>
					</input>
					<button>Create</button>
				</form>
			</div>
			<div>
				<h3>To Do</h3>
				<ul className="list-group">
					{task.filter(item => !item.completed).map((item) => (
					<li className="list-group-item" id="to-hover" key={item.id}>
						{item.text}
						<button id="to-show" onClick={() => toggleTaskCompletion(item.id)}>
							{item.completed ? 'Mark as Uncompleted' : 'Mark as Completed'}
						</button>
						<button id="to-show" onClick={() => deleteTask(item.id)}>
							Delete
						</button>
					</li>
					))}
				</ul>
				<p>{noMarkedAsIncomplete()}</p>
				<h3>Done</h3>
				<ul className="list-group">
                {task.filter(item => item.completed).map((item) => (
                    <li className="list-group-item" id="to-hover" key={item.id}>
                        {item.text}
						<button id="to-show" onClick={() => deleteTask(item.id)}>
							Delete
						</button>
						</li>
                	))}
            	</ul>
				<p>{noMarkedAsCompleted()}</p>
			</div>
		</div>
	);
};

export default Home;

