import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb";
import { Quote } from "@/models/Quote";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const country = (formData.get("country") as string) || "Australia";
    const tenderDue = (formData.get("tenderDue") as string) || "Not specified";
    const projectType = (formData.get("projectType") as string) || "Residential";
    const currency = (formData.get("currency") as string) || "AUD";
    const drawingLink = (formData.get("drawingLink") as string) || "";
    const hasNda = formData.get("hasNda") === "true";
    const ndaFileEntry = formData.get("ndaFile");
    const ndaFile = ndaFileEntry instanceof File && ndaFileEntry.size > 0 ? ndaFileEntry : null;

    if (!name.trim() || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Extract uploaded files
    const fileEntries = formData.getAll("files");
    const files: File[] = [];
    for (const entry of fileEntries) {
      if (entry instanceof File && entry.size > 0) {
        files.push(entry);
      }
    }

    const fileNames = files.map((f) => f.name);

    // 1. Save quote inquiry into MongoDB Atlas
    let dbSaved = false;
    try {
      await connectToDatabase();
      await Quote.create({
        name,
        email,
        country,
        tenderDue,
        projectType,
        currency,
        fileNames,
        drawingLink,
        hasNda,
        ndaFileName: ndaFile ? ndaFile.name : "",
        status: "pending",
      });
      dbSaved = true;
    } catch (dbError) {
      console.error("Failed to save quote to MongoDB:", dbError);
    }

    // 2. Send email with attachments via Resend
    let emailSent = false;
    const resendApiKey = process.env.RESEND_API_KEY;
    const destinationEmail =
      process.env.QUOTE_NOTIFICATION_EMAIL || "info@elec-quant.com";

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // Convert drawing files to Resend attachments
        const attachments = await Promise.all(
          files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            return {
              filename: file.name,
              content: Buffer.from(arrayBuffer),
            };
          })
        );

        // If client attached an NDA, add it to email attachments
        if (ndaFile) {
          const ndaArrayBuffer = await ndaFile.arrayBuffer();
          attachments.push({
            filename: `[NDA] ${ndaFile.name}`,
            content: Buffer.from(ndaArrayBuffer),
          });
        }

        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #1a63cc; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #0f172a; margin: 0; font-size: 22px;">New Take-off Quote Request</h2>
              <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Submitted via ElecQuant Website</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 140px;">Client Name:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Client Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #1a63cc; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Country:</td>
                <td style="padding: 10px 0; color: #0f172a;">${country}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Project Type:</td>
                <td style="padding: 10px 0; color: #0f172a;">${projectType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Tender Due Date:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${tenderDue}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Quote Currency:</td>
                <td style="padding: 10px 0; color: #0f172a;">${currency}</td>
              </tr>
              ${
                drawingLink
                  ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Drawing Link:</td>
                <td style="padding: 10px 0;"><a href="${drawingLink}" target="_blank" style="color: #1a63cc; word-break: break-all;">${drawingLink}</a></td>
              </tr>
              `
                  : ""
              }
              ${
                hasNda
                  ? `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">NDA Requested:</td>
                <td style="padding: 10px 0; color: #d9232a; font-weight: 600;">
                  Yes ${ndaFile ? `(Document attached: ${ndaFile.name})` : "(No document attached)"}
                </td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Attached Files:</td>
                <td style="padding: 10px 0; color: #0f172a;">
                  ${
                    fileNames.length > 0
                      ? fileNames.map((fn) => `<div>📁 ${fn}</div>`).join("")
                      : "<em>No drawing files attached</em>"
                  }
                </td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; padding: 14px 18px; border-radius: 8px; border-left: 4px solid #1a63cc; margin-top: 20px;">
              <p style="margin: 0; color: #334155; font-size: 13px;">
                <strong>Next step:</strong> Reply directly to this email to contact <strong>${name}</strong> at <a href="mailto:${email}" style="color: #1a63cc;">${email}</a>.
              </p>
            </div>
          </div>
        `;

        const fromEmail =
          process.env.RESEND_FROM_EMAIL || "ElecQuant Quotes <quotes@elec-quant.com>";

        const sendResult = await resend.emails.send({
          from: fromEmail,
          to: [destinationEmail],
          replyTo: email,
          subject: `New Take-off Quote: ${projectType} (${country}) - ${name}`,
          html: htmlContent,
          attachments,
        });

        if (sendResult.error) {
          console.warn("Primary email send error, attempting fallback:", sendResult.error);
          // If custom domain is not yet verified in Resend, send to the account owner email
          if (destinationEmail !== "nimradhanethmini2002@gmail.com") {
            const fallbackResult = await resend.emails.send({
              from: "ElecQuant Quotes <onboarding@resend.dev>",
              to: ["nimradhanethmini2002@gmail.com"],
              replyTo: email,
              subject: `[ElecQuant Quote] ${projectType} (${country}) - ${name}`,
              html: htmlContent,
              attachments,
            });
            emailSent = !fallbackResult.error;
          }
        } else {
          emailSent = true;
        }
      } catch (emailError) {
        console.error("Resend email delivery error:", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY is not defined in environment variables.");
    }

    return NextResponse.json({
      success: true,
      emailSent,
      dbSaved,
      fileCount: files.length,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to process quote request";
    console.error("POST /api/quote error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

