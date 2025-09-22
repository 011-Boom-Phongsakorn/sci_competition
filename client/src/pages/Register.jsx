import { useState } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    email: "",
    school: "",
    phone: "",
    type: "teacher",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async () => {
    try {
      const newUser = await AuthService.register(userData);

      if (newUser.status === 201) {
        Swal.fire({
          title: "Register",
          text: newUser.data.message,
          icon: "success",
        }).then(() => {
          setUserData({
            name: "",
            password: "",
            email: "",
            school: "",
            phone: "",
            type: "teacher",
          });
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Register",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-800">Register</h2>
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
              value={userData.name}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              onChange={handleChange}
              value={userData.email}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={handleChange}
              value={userData.password}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              School
            </label>
            <input
              id="school"
              name="school"
              type="text"
              required
              onChange={handleChange}
              value={userData.school}
              className="mt-2 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              onChange={handleChange}
              value={userData.phone}
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

export default Register;
