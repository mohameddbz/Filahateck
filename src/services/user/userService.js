const User = require('../../models/User/User');
const Role = require('../../models/Role/Role');
const AbonnementUser = require('../../models/Abonement/AbonnementUser');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
  const { email, userName, password, phone_number, profile_picture, wilaya, role_id, sellerRole_id } = data;

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
      attributes: ['id', 'userName', 'email', 'phone_number', 'profile_picture', 'wilaya'],
    });

    return users.map(user => ({
      id: user.id,
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phone_number,
      profilePicture: user.profile_picture,
      wilaya: user.wilaya,
      roleName: user.Role ? user.Role.roleName : null,
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

  const allowedFields = ['userName', 'wilaya', 'phone_number'];
  const updatedData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updatedData[field] = data[field];
    }
  });

  return await user.update(updatedData);
};


const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;

  await user.destroy();
  return true;
};

// New function to get the user profile including abonnement
const getUserProfile = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Role,
          attributes: ['roleName'], // Role model is included to get the roleName
        },
        {
          model: AbonnementUser, // ensure association is defined in your User model
          include: ['Abonnement'], // include Abonnement details if necessary
        },
      ],
      // Add role_id to the list of attributes returned from the User model
      attributes: ['id', 'userName', 'email', 'phone_number', 'profile_picture', 'wilaya', 'role_id', 'created_at'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Build the profile response
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phone_number,
      profilePicture: user.profile_picture,
      wilaya: user.wilaya,
      role_id: user.role_id, // Now the role ID is also returned
      roleName: user.Role ? user.Role.roleName : null,
      created_at: user.created_at || null,
      abonnement: user.AbonnementUser || null, // Depending on the association, if hasOne then it will be a single object
    };
  } catch (error) {
    throw new Error('Error fetching user profile: ' + error.message);
  }
};


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
};
