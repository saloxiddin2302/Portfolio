import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../server/request";
import { toast } from "react-toastify";
// import Cookies from "js-cookie"; 
import { TOKEN, USER } from "../../const";
// import Cookies from "js-cookie";
import './user.css'

const Register= () => {
  // React Router navigation
  const navigate = useNavigate();

  // State variables
  const [loading, setLoading] = useState(false);
  const buttonText = loading ? "...loading" : "Register";
  const initialFormData = {
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const formFields = [
    { name: "firstName", placeholder: "First Name", type: "text" },
    { name: "lastName", placeholder: "Last Name", type: "text" },
    { name: "username", placeholder: "Username", type: "text" },
    { name: "phoneNumber", placeholder: "Phone Number", type: "text" },
    { name: "password", placeholder: "Password", type: "password" },
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle registration form submission
  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await request.post("auth/register", formData);
      console.log(res);
      // Registration successful, save token and user data to cookies
      // Cookies.set(TOKEN, res.data.token, { expires: 7 }); // Token "cookie" ga saqlanadi, 7 kun muddati bo'yicha
      // Cookies.set(USER, JSON.stringify(res.data.user), { expires: 7 }); // Ma'lumotlar "cookie" ga saqlanadi, 7 kun muddati bo'yicha

      localStorage.setItem(TOKEN, res.data.token);
      localStorage.setItem(USER, JSON.stringify(res.data.user));
      // window.location.reload();
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Please check your information.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      // className="text-center m"
      style={{ padding: "150px 10px" }}
      className="container"
    >
      <form onSubmit={register} className="Form">
        <h2 className="text_login_register">Register</h2>
        {formFields.map((field) => (
          <div key={field.name}>
            <input
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
            <br />
          </div>
        ))}
        <button type="submit" disabled={loading} className="btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default Register;
