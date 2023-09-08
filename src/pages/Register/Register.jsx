import { useContext, useState } from "react";
import useTitle from "../../Hooks/useTitle";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
  useTitle("Register");

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [notMatched, setNotMatched] = useState("");
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const { registerUser, logoutUser, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.password1 !== data.password2) {
      setNotMatched("Password did not match");
    } else {
      registerUser(data.email, data.password1)
        .then(() => {
          reset();

          updateUser(data.name, data.photoURL, data.phone)
            .then(() => {})
            .catch(() => {});

            console.log(data.phone)

          logoutUser()
            .then(() => {
              // Sign-out successful.
            })
            .catch(() => {
              // An error happened.
            });

          navigate("/login");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const showPassword = (condition) => {
    setShow(!show);
    if (!condition) {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const showPassword2 = (condition) => {
    console.log(condition);
    setShow2(!show2);
    if (!condition) {
      setInputType2("text");
    } else {
      setInputType2("password");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl md:w-4/5 md:mx-auto">
      <div className="w-4/5 p-5 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              name="photoURL"
              placeholder="Photo URL"
              className="input input-bordered"
            />
            {errors.photoURL && (
              <span className="text-red-600">Photo URL is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input 
              {...register("phone", { required: true })}
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered"
            />
            {errors.phone && (
              <span className="text-red-600">Phone Number is required</span>
            )}
          </div>
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
            <div className="relative mb-3">
              <input
                type={inputType}
                {...register("password1", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
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
            {errors.password1?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password1?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password1?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password1?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <div className="relative">
              <input
                type={inputType2}
                {...register("password2", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder="password"
                className="input input-bordered w-full"
              />
              {show2 ? (
                <FaEyeSlash
                  className="absolute right-5 top-1/3"
                  onClick={() => showPassword2(true)}
                />
              ) : (
                <FaEye
                  className="absolute right-5 top-1/3"
                  onClick={() => showPassword2(false)}
                />
              )}
            </div>
            {errors.password2?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password2?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password2?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password2?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
            <p className="text-red-600">{notMatched}</p>
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Sign Up" />
          </div>
        </form>
        <p>
          <small>
            Already have an account <Link to="/login">Login</Link>
          </small>
        </p>
      </div>
    </div>
  );
};

export default Register;
