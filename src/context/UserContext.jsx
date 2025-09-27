import React, { createContext, useState, useEffect } from "react";
import TaskList from "../data/mytasks.json";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDateTime(new Date());
    }, 60 * 1000);
    return () => clearInterval(timerId);
  }, []);

  const currentHour = dateTime.getHours();

  const getCurrentPeriod = () => {
    if (currentHour >= 5 && currentHour < 12) return "morning";
    if (currentHour >= 12 && currentHour < 17) return "afternoon";
    return "evening";
  };

  // Initialize users
  const [users, setUsers] = useState(() => {
    const currentPeriod = getCurrentPeriod();
    return TaskList.map((user) => {
      const total =
        user.tasks.morning.length +
        user.tasks.afternoon.length +
        user.tasks.evening.length;

      return {
        ...user,
        totalTasks: total,
        completedCount: 0,
        stars: 0,
        weeklyStars: 0,
        dailyStars: [],
        selectedPeriod: currentPeriod,
        tasks: {
          ...user.tasks,
          morning: user.tasks.morning.map((task, i) => ({ ...task, id: i + 1 })),
          afternoon: user.tasks.afternoon.map((task, i) => ({ ...task, id: i + 100 })),
          evening: user.tasks.evening.map((task, i) => ({ ...task, id: i + 200 })),
        },
      };
    });
  });

  return (
    <UserContext.Provider value={{ users, setUsers, dateTime }}>
      {children}
    </UserContext.Provider>
  );
};
