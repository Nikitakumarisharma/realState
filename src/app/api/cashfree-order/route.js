export async function POST(req) {
  try {
    const body = await req.json();
    const { orderAmount, customerName, customerEmail, customerPhone } = body;

    const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
    const CASHFREE_APP_ID = process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
    const CASHFREE_MODE = process.env.NEXT_PUBLIC_CASHFREE_MODE;

    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      return Response.json({ error: "Cashfree API keys are missing in .env" }, { status: 500 });
    }

    const BASE_URL =
      CASHFREE_MODE === "sandbox"
        ? "https://sandbox.cashfree.com/pg/orders"
        : "https://api.cashfree.com/pg/orders";

    const orderId = `ORDER_${Date.now()}`;

    const requestBody = {
      order_id: orderId,
      order_amount: parseFloat(orderAmount),
      order_currency: "INR",
      customer_details: {
        customer_id: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-status?order_id=${orderId}`,
        notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment-webhook`,
      },
    };

    console.log("Sending Request to Cashfree:", requestBody);
    console.log("base url",BASE_URL)

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("Cashfree API Response:", data);

    if (!response.ok) {
      console.error("Cashfree API Error:", data);
      return Response.json({ error: "Cashfree order creation failed", details: data }, { status: 400 });
    }

    return Response.json({ status: "OK", paymentSessionId: data.payment_session_id });
  } catch (error) {
    console.error("Error creating Cashfree order:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
