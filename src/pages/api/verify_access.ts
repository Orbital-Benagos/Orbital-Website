import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebaseAdmin";
import { hashAccessCode } from "@/lib/accessCode";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email and code are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const submittedHash = hashAccessCode(code.trim());

    // 1. Find an active code tied to this email
    const snapshot = await db
      .collection("access_codes")
      .where("workEmail", "==", normalizedEmail)
      .where("status", "==", "active")
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ message: "Invalid email or code" });
    }

    // 2. Check if any active code matches the submitted hash
    const matchedDoc = snapshot.docs.find(
      (doc) => doc.data().codeHash === submittedHash,
    );

    if (!matchedDoc) {
      return res.status(401).json({ message: "Invalid email or code" });
    }

    // 3. Mint the JWT token (valid for 24 hours)
    const token = jwt.sign(
      {
        email: normalizedEmail,
        codeId: matchedDoc.id,
      },
      process.env.LOVABLE_ACCESS_SECRET!,
    );

    const targetUrl =
      process.env.NEXT_PUBLIC_LOVABLE_APP_URL ||
      "https://orbitalapp.lovable.app/builder";

    // 4. Return success along with the token and full redirect URL
    return res.status(200).json({
      message: "Access granted",
      token,
      redirectUrl: `${targetUrl}?t=${token}`,
    });
  } catch (error) {
    console.error("Verify access code error:", error);
    return res.status(500).json({ message: "Verification failed" });
  }
}
