"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa"; // Import for the spinner icon

export default function Page() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const payerID = searchParams.get("PayerID");

    if (token && payerID) {
      capturePayment(token, payerID);
    } else {
      console.error("Missing token or PayerID");
    }
  }, [searchParams]);

  const capturePayment = async (token: string, payerID: string) => {
    setLoading(true);
    try {
      const authToken = getCookie("auth_token");

      if (!authToken) {
        throw new Error("Authorization token is missing or invalid.");
      }

      const response = await axios.post(
        `http://localhost:3005/paypal/capture-payment/${token}/${payerID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response.data.orderId);

      if (response.data.success) {
        setPaymentStatus("Payment captured successfully!");
        setIsSuccess(true);
      } else {
        setPaymentStatus("Payment capture failed, please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      setPaymentStatus("An error occurred while processing the payment.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {loading && (
        <FaSpinner className="animate-spin text-pink-500" size={50} />
      )}

      {!loading && paymentStatus && (
        <div
          className={`text-center mt-6 ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          <h1 className="text-2xl font-semibold">{paymentStatus}</h1>

          {isSuccess === true && (
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Go to Home Page
            </button>
          )}
          {isSuccess === false && (
            <button
              onClick={() => router.push("/checkout")}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Retry Payment
            </button>
          )}
        </div>
      )}
    </div>
  );
}
