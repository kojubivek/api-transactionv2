import UserSchema from "./UserSchema.js";

//createUser
export const insertUser = (obj) => {
  return UserSchema(obj).save();
};

//findUser

export const findUser = (obj) => {
  return UserSchema.findOne(obj);
};
