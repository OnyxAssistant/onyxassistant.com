import { NextResponse } from "next/server";
import MailerLite from "@mailerlite/mailerlite-nodejs";

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY || '',
});


export async function POST(request: Request) {
  const body = await request.json();
  try {
    const params = {
      email: body?.email,
      groups: process.env.MAILERLITE_GROUP_ID ? [process.env.MAILERLITE_GROUP_ID] : [],
      status: "active" as const,
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);

    if (!response) {
      throw new Error("Failed to add email to the list");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
