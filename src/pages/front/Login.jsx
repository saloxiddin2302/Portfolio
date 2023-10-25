import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { request } from "../../server/request";
import { toast } from "react-toastify";
// import Cookies from "js-cookie";
import { TOKEN, USER } from "../../const";
// import Cookies from "js-cookie";

const Login = () => {
  // const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const buttonText = loading ? "...loading" : "Login";

  const initialFormData = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginResponse = (res) => {
    // Registration successful, save token and user data to cookies
    // Cookies.set(TOKEN, res.data.token, { expires: 7 }); // Token "cookie" ga saqlanadi, 7 kun muddati bo'yicha
    // Cookies.set(USER, JSON.stringify(res.data.user), { expires: 7 }); // Ma'lumotlar "cookie" ga saqlanadi, 7 kun muddati bo'yicha

    console.log(res.data);
    localStorage.setItem(TOKEN, res.data.token);
    localStorage.setItem(USER, JSON.stringify(res.data.user));
    console.log(res.data.user);
    // window.location.reload();
    // Assuming the server returns a role in the response
    if (res.data.user.role !== "user") {
      // If the user's role is not "user", redirect to the dashboard
      window.location.href = "/dashboard"; // Yoki kerakli manzilga boshqa URL
      toast.success("Welcome! You have successfully logged in.");
    } else {
      // If the user's role is "user", display an info message
      toast.info("You must verify yourself as a client!");
    }
  };


  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await request.post("auth/login", formData);
      console.log(res);
      handleLoginResponse(res);
    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "150px 10px" }} className="container">
      <form onSubmit={login} className="Form">
        <h2 className="text_login_register">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-1/2 border mb-3"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="w-1/2 border mb-3"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit" disabled={loading} className="btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Login;
