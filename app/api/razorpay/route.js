import ConnectDb from "@/components/ConnectDb";
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await ConnectDb();

    // Ensure the request is a POST request
    if (req.method !== "POST") {
      return NextResponse.json({ success: false, message: "Invalid request method" });
    }

    let body = await req.formData();
    body = Object.fromEntries(body);


    // Check if razorpay_order_id is present in the form
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
      console.error("Order ID not found:", body.razorpay_order_id);
      return NextResponse.json({ success: false, message: "Order ID not found" });
    }

    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaySecret;

    // Verify the payment
    let isValid = validatePaymentVerification(
      { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
      body.razorpay_signature,
      secret
    );

    if (isValid) {
      let updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: "true" },
        { new: true }
      );
      ("Payment verified and updated:", updatedPayment);

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentDone=true`);
    } else {
      console.error("Payment verification failed");
      return NextResponse.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    return NextResponse.json({ success: false, message: "An error occurred", error: error.message });
  }
};
