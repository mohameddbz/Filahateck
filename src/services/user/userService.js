// The service layer contains business logic and interacts with the database.

const User = require('../../models/User/User');
const Role = require('../../models/Role/Role');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
  const { email, userName, password, phone_number, profile_picture, wilaya, role_id } = data;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.create({
    email,
    userName,
    password: hashedPassword,
    phone_number,
    profile_picture,
    wilaya,
    role_id,
  });
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          attributes: ['roleName'], // Fetch only roleName from the Role table
        },
      ],
      attributes: ['id', 'userName', 'email', 'phone_number', 'profile_picture', 'wilaya'], // Select specific user attributes if needed
    });

    return users.map(user => ({
      id: user.id,
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phone_number,
      profilePicture: user.profile_picture,
      wilaya: user.wilaya,
      roleName: user.Role ? user.Role.roleName : null, // Handle null roles
    }));
  } catch (error) {
    console.error('Error fetching users with roles:', error);
    throw error;
  }
};

  
const getUserById = async (id) => {
    return await User.findByPk(id);
};

const updateUser = async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) return null;
  
    const updatedData = { ...data };
    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10);
    }
  
    return await user.update(updatedData);
  };

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;
  
    await user.destroy();
    return true;
  };

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  };