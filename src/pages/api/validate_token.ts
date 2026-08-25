import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { db } from "@/lib/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Allow CORS if your Next.js app and Lovable app are on different domains
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const { token } = req.body;
    if (!token)
      return res
        .status(400)
        .json({ valid: false, message: "No token provided" });

    // Verify token payload and expiration
    const decoded = jwt.verify(token, process.env.LOVABLE_ACCESS_SECRET!) as {
      codeId: string;
    };

    // Check if still active in DB
    const docSnap = await db
      .collection("access_codes")
      .doc(decoded.codeId)
      .get();
    if (!docSnap.exists || docSnap.data()?.status !== "active") {
      return res.status(401).json({ valid: false, message: "Access revoked" });
    }

    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    return res
      .status(401)
      .json({ valid: false, message: "Token expired or invalid" });
  }
}
