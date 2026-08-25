import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { generateAccessCode, hashAccessCode } from "@/lib/accessCode";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      fullName,
      workEmail,
      institution,
      institutionType,
      role,
      teamSize,
      regionCovered,
      useCase,
      anythingElse,
    } = req.body;

    if (!workEmail) {
      return res.status(400).json({ message: "Work email is required" });
    }

    const normalizedEmail = workEmail.trim().toLowerCase();

    // 1. Check if email already exists in waitlist_requests
    const existingQuery = await db
      .collection("waitlist_requests")
      .where("workEmail", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existingQuery.empty) {
      return res.status(400).json({
        message:
          "This email address has already been submitted to the waitlist.",
      });
    }

    // 2. Save the waitlist request
    const requestRef = await db.collection("waitlist_requests").add({
      fullName,
      workEmail: normalizedEmail,
      institution,
      institutionType,
      role,
      teamSize,
      regionCovered,
      useCase,
      anythingElse,
      status: "pending",
      createdAt: FieldValue.serverTimestamp(),
    });

    // 3. Auto-generate the access code
    const rawCode = generateAccessCode();
    const codeHash = hashAccessCode(rawCode);

    await db.collection("access_codes").add({
      requestId: requestRef.id,
      workEmail: normalizedEmail,
      codeHash,
      status: "active",
      sent: false,
      createdAt: FieldValue.serverTimestamp(),
      expiresAt: null,
    });

    // 4. Notify admin via email
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: process.env.ZOHO_EMAIL,
      replyTo: normalizedEmail,
      subject: "New Orbital Waitlist Request Access",
      html: `
        <div>
          <h2>New Orbital Waitlist Request Access</h2>
          <p><strong>Request ID:</strong> ${requestRef.id}</p>
          <p><strong>Full name:</strong> ${fullName}</p>
          <p><strong>Work email:</strong> ${normalizedEmail}</p>
          <p><strong>Institution:</strong> ${institution}</p>
          <p><strong>Institution type:</strong> ${institutionType}</p>
          <p><strong>Role/Job title:</strong> ${role}</p>
          <p><strong>Team size:</strong> ${teamSize}</p>
          <p><strong>Region covered:</strong> ${regionCovered}</p>
          <p><strong>Use case:</strong> ${useCase}</p>
          <p><strong>Anything else?:</strong> ${anythingElse}</p>
          <hr />
          <p><strong>Access code (ready to send):</strong> ${rawCode}</p>
        </div>
      `,
    });

    return res
      .status(200)
      .json({ message: "Request received", id: requestRef.id });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return res.status(500).json({ message: "Failed to submit request" });
  }
}
