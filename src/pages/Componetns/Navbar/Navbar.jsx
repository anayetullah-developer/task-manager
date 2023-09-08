import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  console.log(user, loading);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        // Sign-out successful.
      })
      .catch(() => {
        // An error happened.
      });

    navigate("/login");
  };

  return (
    <div className="bg-indigo-500 py-4">
      <div className="navbar  container mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold uppercase text-cyan-400">
            Task Manager
          </Link>
        </div>
        <div className="flex-1 gap-2 font-semibold">
        <Link to="/" className="text-white font-semibold text-lg mx-4">
          Home
        </Link>
        <Link
          to="/"
          className="text-white hover:text-indigo-300 mx-4"
        >
          Task Management
        </Link>
        <Link
          to="/team-manager"
          className="text-white hover:text-indigo-300 mx-4"
        >
          Team Management
        </Link>
        </div>
        <div className="flex-none gap-2">
          <div>
            {loading ? (
              <p>...</p>
            ) : user ? (
              <Link to="/profile">
                <button className="font-semibold btn btn-info">Profile</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="font-semibold btn btn-info">Login</button>
              </Link>
            )}
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {loading ? (
                  <p>...</p>
                ) : user ? (
                  <img src={user?.photoURL} />
                ) : (
                  <></>
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32"
            >
              <li>
                <a className="">Profile</a>
              </li>
              <li>
                {loading ? (
                  <p>...</p>
                ) : user ? (
                  <button onClick={handleLogOut}>Logout</button>
                ) : (
                  <Link to="/login">
                    {" "}
                    <button>Login</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
