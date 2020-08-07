export const makePayment = async (amount, successFunc, errorFunc) => {
  const key = process.env.REACT_APP_REMITA_KEY
  const RmPaymentEngine = window.RmPaymentEngine
  var paymentEngine = RmPaymentEngine.init({
    key: key,
    customerId: "",
    firstName: "",
    lastName: "",
    email: "",
    narration: "Payment Description",
    amount: amount,
    onSuccess: function (response) {
      console.log('callback Successful Response', response);
      successFunc(response)
    },
    onError: function (response) {
      console.log('callback Error Response', response);
      errorFunc(response)
    },
    onClose: function () {
      console.log("closed");
    }
  });
  paymentEngine.showPaymentWidget();
}
