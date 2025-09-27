import React, {useContext} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";


function Rewards(){

    const { users } = useContext(UserContext);
    const calculateMonthlyStars = (user) => {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);

  return user.dailyStars.filter(dateString => {
    const date = new Date(dateString);
    return date >= thirtyDaysAgo;
  }).length;
};

    return(
     
    <div className="rewards-page">
        <Header />
      <Sidebar />
      <div className="rewards-container">
        <div className="Rewards-col">
        <h1>Rewards Summary</h1>

        {users.map((user, index) => {
          const monthlyStars = calculateMonthlyStars(user);

          return (
            <div key={index} className="reward-card">
              <h2>{user.user}</h2>
               <p>Weekly Stars: {user.weeklyStars}</p>
               <hr></hr>
              <p>Monthly Stars (last 30 days): {monthlyStars}</p>
              <hr></hr>
              <p>Total Gold Stars (Year): {user.stars}</p>

              {user.stars >= 100 && (
                <p className="big-reward">🏆 Eligible for Year-End Reward!</p>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );

}
export default Rewards