// The service layer contains business logic and interacts with the database.

const User = require('../../models/User/User');
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
    return await User.findAll();
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