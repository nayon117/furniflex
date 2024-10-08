import axiosPublic from "."

//  creating a payment intent
export const createPaymentIntent = async (itemInfo) => {
  const response = await axiosPublic.post('/create-payment-intent', {
    price: itemInfo.price
  });
  return response.data;
};

  
// save item info in db
export const saveItemInfo = async (paymentInfo) => {
    const { data } = await axiosPublic.post('/bookings', paymentInfo)
    return data
  }