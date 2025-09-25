import { useState, useEffect } from "react";
import Activity from "../components/ActivityCard";
import ActivityService from "../services/activity.service";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ActivityService.getAllActivities();

        if (response.status === 200) {
          setActivities(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Get All Activities",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>Activities</div>
      {activities.length > 0 &&
        activities.map((activity) => (
          <Activity key={activity.id} activity={activity} />
        ))}
    </div>
  );
};

export default Activities;
