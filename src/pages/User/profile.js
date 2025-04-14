import React, { useState, useEffect } from "react";
import { makeRequest } from "./../../utils/api/httpService";
import { format } from "d3";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    wilaya: "",
    phoneNumber: "",
    roleName:"",
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await makeRequest("/users/profile", "GET", null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
        console.log(response.data.data)
        const fetchedUser = response.data.data;
        setUser(fetchedUser);
        setFormData({
          userName: fetchedUser.userName,
          wilaya: fetchedUser.wilaya || "",
          phoneNumber: fetchedUser.phoneNumber || "",
          roleName: fetchedUser.roleName || ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      // Assuming your update endpoint is something like /users/:id
      const response = await makeRequest(
        `/users/${user.id}`,
        "PUT",
        {
          userName: formData.userName,
          phone_number: formData.phoneNumber,
          wilaya: formData.wilaya,
          role_id: user.role_id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      console.log(response)
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <p className="text-center py-6 text-2xl">Loading...</p>;


  return (
    <div className="max-w-2xl mx-auto mt-10 p-10 bg-white rounded-xl shadow-2xl">
      <div className="flex flex-col items-center">
        <img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-300"
        />
        {editMode ? (
          <div className="w-full space-y-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="userName">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="wilaya">
                Wilaya
              </label>
              <input
                type="text"
                id="wilaya"
                name="wilaya"
                value={formData.wilaya}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="phoneNumber">
                Téléphone
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition duration-200"
                onClick={handleUpdate}
                disabled={updating}
              >
                {updating ? "Enregistrement..." : "Enregistrer"}
              </button>
              <button
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition duration-200"
                onClick={() => setEditMode(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-2">{user.userName}</h2>
            <p className="text-gray-600 text-xl mb-3">{user.email}</p>
            <div className="w-full text-left space-y-3 text-lg">
              <p>
                <span className="font-semibold">Téléphone:</span>{" "}
                {user.phoneNumber || "Non renseigné"}
              </p>
              <p>
                <span className="font-semibold">Wilaya:</span>{" "}
                {user.wilaya || "Non renseigné"}
              </p>
              <p>
                <span className="font-semibold">Rôle:</span> {formData.roleName}
              </p>
              <p className="text-gray-500">
                Membre depuis{" "}
                {new Date(user.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <button
              className="mt-6 px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xl font-medium rounded-md transition duration-200"
              onClick={() => setEditMode(true)}
            >
              Modifier le profil
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
