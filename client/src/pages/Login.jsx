import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ใช้ context
  // import user มาเพื่อ login มาแล้ว จะไม่สามารถ login อีก ดูได้ที่ line 20 - 24
  const { login: loginFn, user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // login ยิง api ไป แสดงว่ามันไปทำงานข้างนอก แล้วมันต้องส่งกลับมา จึงต้องมี await เพื่อรอให้การทำงานมันเสร็จ
      const currentUser = await AuthService.login(
        loginData.email,
        loginData.password
      );
      if (currentUser.status === 200) {
        Swal.fire({
          title: "User Login",
          text: currentUser?.data.message,
          icon: "success",
        }).then(() => {
          loginFn(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "User Login",
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
            Sign in to your account
          </h2>
        </div>

        <form>
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
              autoComplete="email"
              required
              onChange={handleChange}
              value={loginData.email}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
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
              autoComplete="current-password"
              required
              onChange={handleChange}
              value={loginData.password}
              className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not an account?{" "}
          <a
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
