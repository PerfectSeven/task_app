import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";
import TaskList from "../data/mytasks.json";
import ProgressBar from "../components/ProgessBar.jsx";
import Sidebar from "../components/Sidebar.jsx";


function Todo() {
 const { users, setUsers, dateTime} = useContext(UserContext);
  const [selectedPeriod, setSelectedPeriod] = useState("morning");

  

  const currentHour = dateTime.getHours();

   const getProgress = (user) => {
    const totalTasks =
      user.tasks.morning.length +
      user.tasks.afternoon.length +
      user.tasks.evening.length +
      user.completedCount;
    return totalTasks === 0
      ? 0
      : Math.round((user.completedCount / totalTasks) * 100);
  };
  

  const handleCheck = (userIndex, period, taskId) => {
    const user = users[userIndex];

   const updatedPeriodTasks = user.tasks[period].filter(
      (task) => task.id !== taskId
    );

    const newCompletedCount = user.completedCount + 1;
    const total = user.totalTasks;
    const today = new Date().toDateString();

let updatedUser = {
  ...user,
  tasks: {
    ...user.tasks,
    [period]: updatedPeriodTasks,
  },
  completedCount: newCompletedCount,
  
};

if (newCompletedCount === total && 
  !user.dailyStars.includes(today) &&
total > 0
) {
  updatedUser = {
    ...updatedUser,
    dailyStars: [...user.dailyStars, today],
    weeklyStars: user.weeklyStars + 1,
    reward: "1 Gold Star"
  };
}

const updatedUsers = [...users];
updatedUsers[userIndex] = updatedUser;
setUsers(updatedUsers);

  };


  const renderTaskList = (tasks, userIndex, period) => {
    const isDisabled =
      (period === "afternoon" && currentHour < 12) ||
      (period === "evening" && currentHour < 17);

    if (!tasks || tasks.length === 0) return <p className="congrats-msg">Congratulations. You completed all your tasks</p>;

    return (
      <ul
        style={{
          opacity: isDisabled ? 0.4 : 1,
          pointerEvents: isDisabled ? "none" : "auto",
        }}
      >
        {tasks.map((task) => (
          <li className="tasksid" key={task.id}>
            <span style={{ flexGrow: 1 }}>{task.name}</span>
            <input
              type="checkbox"
              onChange={() => handleCheck(userIndex, period, task.id)}
              disabled={isDisabled}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header dateTime={dateTime} />
      <div className="task-page">
        <div className="bar-sec">
          <Sidebar />
        </div>

        <div className="todo-container">
          {users.length === 0 && <p>No users/tasks found.</p>}
          {users.map((user, userIndex) => {
            const initial = user.user.charAt(0).toUpperCase();
            const badgeColors = [
              "#4CAF50",
              "#2196F3",
              "#FF9800",
              "#9C27B0",
              "#E91E63",
            ];
            const badgeColor = badgeColors[userIndex % badgeColors.length];

            return (
              <div
                key={user.user}
                className={`user-block  user-bg-${userIndex % 4}`}>
                <div className="profile">
                  <div
                    className="id-badge"
                    style={{ backgroundColor: badgeColor }}>{initial}
                  </div>
                  <h2>{user.user}</h2>
                </div>

                <ProgressBar progress={getProgress(user)} />
                <p>{getProgress(user)}% complete</p>
                 {user.reward && <p>Reward: {user.reward}</p>}

                <div className="task-section">
                  <div className="time-btns">
                    <button
                      onClick={() => setSelectedPeriod("morning")}
                      className={selectedPeriod === "morning" ? "active" : ""} >
                      Morning
                    </button>
                    <button
                      onClick={() => setSelectedPeriod("afternoon")}
                      className={selectedPeriod === "afternoon" ? "active" : ""}>
                      Afternoon
                    </button>
                    <button
                      onClick={() => setSelectedPeriod("evening")}
                      className={selectedPeriod === "evening" ? "active" : ""} >
                      Evening
                    </button>
                  </div>
                  <hr></hr>

                  <div className="task-list">
                    {selectedPeriod === "morning" && renderTaskList(user.tasks.morning, userIndex, "morning")}
                    {selectedPeriod === "afternoon" &&renderTaskList(user.tasks.afternoon, userIndex, "afternoon")}
                    {selectedPeriod === "evening" && renderTaskList(user.tasks.evening, userIndex, "evening")}
                  </div>
                </div>
              </div>
            );
          })}
          
          
        </div>
      </div>
    </>
  
  
  );
}

export default Todo;
