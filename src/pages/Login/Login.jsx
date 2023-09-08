import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  // Variables
  useTitle("Login");
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  //Functions
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    loginUser(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
        alert(loginError);
      });
  };

  //Google sign in
  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((data) => {
        console.log(data.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoginError(errorMessage);
        alert(loginError);
      });
  };

  const showPassword = (condition) => {
    setShow(!show);
    if (!condition) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="card  g-base-100 shadow-xl md:w-4/5 md:mx-auto">
      <div className="md:w-3/5 sm:w-full mx-auto sm:p-2 md:p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="email"
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={inputType}
                {...register("password", {
                  required: true,
                })}
                placeholder="password"
                className="input input-bordered w-full"
              />
              {show ? (
                <FaEyeSlash
                  className="absolute right-5 top-1/3"
                  onClick={() => showPassword(true)}
                />
              ) : (
                <FaEye
                  className="absolute right-5 top-1/3"
                  onClick={() => showPassword(false)}
                />
              )}
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
        <div>
          <button
            type="submit"
            className="mt-2 btn btn-primary w-full"
            onClick={handleGoogleSignIn}
          >
            <FaGoogle /> Login with google
          </button>
        </div>
        <p>
          <small>
            Do not have an account <Link to="/register">Register</Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Login;
