import { Hono } from "hono";
import { cors } from "hono/cors";
import nodemailer from "nodemailer";

const app = new Hono().basePath("api");

app.use(cors({ origin: "*" }));

app.get("/ping", (c) => c.json({ message: `Pong! ${Date.now()}` }));

app.post("/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, message } = body;

    if (!name || !email || !company) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.masakhegroup.co.za",
      port: 465,
      secure: true,
      auth: {
        user: "invest@masakhegroup.co.za",
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Masakhe Investor Form" <invest@masakhegroup.co.za>',
      to: "invest@masakhegroup.co.za",
      replyTo: email,
      subject: `New Investment Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #192943;">New Investment Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #192943; width: 140px;">Full Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #192943;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #192943;">Company</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${company}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #192943; vertical-align: top;">Message</td>
              <td style="padding: 10px; color: #333;">${message.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
          </table>
        </div>
      `,
    });

    return c.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return c.json({ error: "Failed to send email" }, 500);
  }
});

const port = 3001;
console.log(`API server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
