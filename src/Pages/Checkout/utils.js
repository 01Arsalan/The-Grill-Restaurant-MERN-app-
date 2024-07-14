import axios from "axios";

export const createOrder = async (totalAmount, receipt) => {

    try {
        const response = await axios.post('/api/order/createOrder', { totalAmount, receipt }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response
    } catch (error) {
        console.error('Error sending Razorpay data:', error);
    }
}

export const confirmOrder = async (response,razorpayUserInfo,navigate) => {

    const options = {
        key: "rzp_test_L9kTgI41PnF2BB",
        amount: response.data.amount * 100,
        currency: "INR",
        name: "The Grill",
        description: "Test Transaction",
        order_id: response.data.id,
        handler: function (response) {
            navigate('/menu/confirmation', { replace: true });
            //use,R-pay payment-id,order-id,signature   
        },
        prefill: razorpayUserInfo,
        theme: {
            color: "#3399cc"
        }
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
        // order failed. Try again.
    });

    rzp1.open();
}


