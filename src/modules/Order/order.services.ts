
import AppError from "../../errors/AppError";


import httpStatus from "http-status";
import { OrderModel } from "./order.model";


import { UserModel } from "../User/user.model";
import { IUser, TUser } from "../User/user.interface";

//create an order

const createOrderIntoDB = async (
    customer:IUser,
    payload: { meal: string; dietaryPreference?: string[] }
  ) => {
    // Validate payload
    // if (!payload?.meal) {
    //   throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Meal must be specified');
    // }
  console.log("user=>",customer);
  console.log("payload=>",payload);
    // Fetch the customer from DB
    const userData = await UserModel.findById(customer.userId);
    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
  
    // Create order
    const order = await OrderModel.create({
      meal: payload.meal,
      dietary: payload.dietaryPreference || [],
      customerId: userData._id,
      status: 'pending',
    });
  console.log(order);
    return order;
  };




// get all orders
const getAllOrderFromDB=async()=>{
    const result = await OrderModel.find();
    return result;
}
// get each user order
const getSingleOrder=async(id:string)=>{
  const userOrders = await OrderModel.find({ _id: id }).populate({
    path: "meal",

  });
console.log("order=>",userOrders);

    return userOrders;
}

const updateUserProfileFromDB = async(id:string,data:TUser)=>{
  // console.log(data,id);
  const result= await UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  return result;
}



export const OrderServices = {
  createOrderIntoDB,
updateUserProfileFromDB,
  getAllOrderFromDB,

  getSingleOrder
};
