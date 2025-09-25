import { useEffect } from "react";
import Swal from "sweetalert2";
import ActivityService from "../services/activity.service";

const ActivityCard = ({ activity }) => {
  useEffect(() => {}, []);

  const handleDelete = async (id) => {
    console.log("Deleting id:", id);
    try {
      const response = await ActivityService.deleteActivity(id);
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted Activity",
          text: "Activity deleted successfully!",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl mb-2">{activity.name}</h2>
        <p className="text-gray-700 text-base mb-2">{activity.description}</p>

        <div className="text-sm text-gray-600 mb-1">
          <strong>ประเภท:</strong> {activity.type}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>ระดับ:</strong> {activity.level}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>จำนวนทีม:</strong> {activity.team_size}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>วันที่จัดกิจกรรม:</strong> {activity.date}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>สถานที่:</strong> {activity.location}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>ลงทะเบียนเปิด:</strong> {activity.reg_open}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>ลงทะเบียนปิด:</strong> {activity.reg_close}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>ผู้ติดต่อ:</strong> {activity.contact_name}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>โทรศัพท์:</strong> {activity.contact_phone}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>อีเมล:</strong> {activity.contact_email}
        </div>
        <div className="text-sm font-semibold text-green-600 mt-2">
          สถานะ: {activity.status}
        </div>

        {/* ปุ่ม Update และ Delete */}
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => onUpdate(activity)}
          >
            Update
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
            onClick={() => handleDelete(activity.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
