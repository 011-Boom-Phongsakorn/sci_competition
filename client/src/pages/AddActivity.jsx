import { useState } from "react";
import { useNavigate } from "react-router";
import ActivityService from "../services/activity.service";
import Swal from "sweetalert2";
const AddActivity = () => {
  const navigate = useNavigate();

  // utils
  const formatDate = (ts) =>
    ts ? new Date(Number(ts)).toISOString().split("T")[0] : "";
  const toTimestamp = (dateStr) => new Date(dateStr).getTime();

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    type: "",
    level: "",
    team_size: 1,
    date: Date.now(),
    location: "",
    reg_open: Date.now(),
    reg_close: Date.now(),
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newActivity = await ActivityService.createActivity(activity);
      console.log(newActivity);
      if (newActivity.status === 200) {
        Swal.fire({
          title: "Add new activity",
          text: "Add new activity successfully!",
          icon: "success",
        }).then(() => {
          setActivity({
            name: "",
            description: "",
            type: "",
            level: "",
            team_size: 1,
            date: Date.now(),
            location: "",
            reg_open: Date.now(),
            reg_close: Date.now(),
            contact_name: "",
            contact_phone: "",
            contact_email: "",
            status: "draft",
          });
          navigate("/");
        });
      }
      //   ถ้า error จะมาที่รนี้เลย
    } catch (error) {
      Swal.fire({
        title: "Add new activity",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            Add New Activity
          </h2>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              onChange={handleChange}
              value={activity.name}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              required
              onChange={handleChange}
              value={activity.description}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              type
            </label>
            <input
              id="type"
              name="type"
              type="text"
              required
              onChange={handleChange}
              value={activity.type}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              level
            </label>
            <input
              id="level"
              name="level"
              type="text"
              required
              onChange={handleChange}
              value={activity.level}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              team_size
            </label>
            <input
              id="team_size"
              name="team_size"
              type="number"
              required
              onChange={handleChange}
              value={activity.team_size}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  date: toTimestamp(e.target.value),
                }))
              }
              value={formatDate(activity.date)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              onChange={handleChange}
              value={activity.location}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              reg_open
            </label>
            <input
              id="reg_open"
              name="reg_open"
              type="date"
              required
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  reg_open: toTimestamp(e.target.value),
                }))
              }
              value={formatDate(activity.reg_open)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              reg_close
            </label>
            <input
              id="reg_close"
              name="reg_close"
              type="date"
              required
              onChange={(e) =>
                setActivity((prev) => ({
                  ...prev,
                  reg_close: toTimestamp(e.target.value),
                }))
              }
              value={formatDate(activity.reg_close)}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              contact_name
            </label>
            <input
              id="contact_name"
              name="contact_name"
              type="text"
              required
              onChange={handleChange}
              value={activity.contact_name}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              contact_phone
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="text"
              required
              onChange={handleChange}
              value={activity.contact_phone}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              contact_email
            </label>
            <input
              id="contact_email"
              name="contact_email"
              type="text"
              required
              onChange={handleChange}
              value={activity.contact_email}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              status
            </label>
            <input
              id="status"
              name="status"
              type="text"
              required
              onChange={handleChange}
              value={activity.status}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default AddActivity;
