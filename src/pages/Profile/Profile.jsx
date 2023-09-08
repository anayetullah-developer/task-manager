import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logoutUser, loading } = useContext(AuthContext);
  console.log(user)
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <img
        src={loading ? <h1>...</h1> : user?.photoURL}
        alt="Profile Image"
        className="mx-auto w-32 h-32 rounded-full"
      />
      <div className="text-center">
        <h1 className="text-2xl font-semibold mt-4">{loading ? <span>...</span> : user?.displayName}</h1>
        <p className="text-gray-600 mt-2">{loading ? <span>...</span> : user?.email}</p>
        <p className="text-gray-600">{loading ? <span>...</span> : user?.phoneNumber}</p>
      </div>
      <div className="mt-6 text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full" onClick={handleLogOut}>
            Log out
          </button>
          
        </div>
    </div>
  );
};

export default Profile;
