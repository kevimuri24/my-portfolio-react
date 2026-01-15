const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// ====== CONFIGURATION ======
const PORT = process.env.PORT || 5000;
const EMAIL_USER = process.env.EMAIL_USER || "xxxxxxxxxxxxxxxx@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS;

console.log("\n🔧 Configuration:");
console.log(`   Port: ${PORT}`);
console.log(`   Email User: ${EMAIL_USER}`);
console.log(`   Email Pass: ${EMAIL_PASS ? "✅ Set" : "❌ NOT SET"}`);

// ====== CORS MIDDLEWARE ======
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    // Allow localhost on any port for development
    if (origin.startsWith("http://localhost:")) {
      return callback(null, true);
    }
    
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// ====== REQUEST LOGGING ======
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ${req.method} ${req.path}`);
  console.log(`   Origin: ${req.get("origin") || "none"}`);
  if (Object.keys(req.body).length > 0) {
    console.log(`   Body:`, req.body);
  }
  next();
});

// ====== SMTP CONFIGURATION ======
let transporter = null;

if (EMAIL_PASS) {
  try {
    transporter = nodemailer.createTransport({
      host: "XXXXXXXXXXXXX@gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify SMTP connection
    transporter.verify((error, success) => {
      if (error) {
        console.error("\n❌ SMTP Connection Failed:");
        console.error(`   ${error.message}`);
        transporter = null;
      } else {
        console.log("\n✅ SMTP Connection Verified - Ready to send emails");
      }
    });
  } catch (error) {
    console.error("\n❌ SMTP Setup Error:");
    console.error(`   ${error.message}`);
    transporter = null;
  }
} else {
  console.warn("\n⚠️  Email not configured - EMAIL_PASS environment variable not set");
  console.warn("   Emails will not be sent, but the server will still accept requests\n");
}

// ====== ROUTES ======

// Health check endpoint
app.get("/", (req, res) => {
  console.log("✅ Health check - Server is running");
  res.json({ 
    status: "OK",
    timestamp: new Date().toISOString(),
    emailConfigured: !!transporter
  });
});

// Contact form endpoint
app.post("/contact", async (req, res) => {
  console.log("\n📧 Contact form submission received");
  
  try {
    // Extract and validate form data
    const firstName = (req.body.firstName || "").trim();
    const lastName = (req.body.lastName || "").trim();
    const name = `${firstName} ${lastName}`.trim() || "Website Visitor";
    const email = (req.body.email || "").trim();
    const message = (req.body.message || "").trim();

    console.log(`   From: ${name} (${email})`);
    console.log(`   Message: ${message.substring(0, 50)}...`);

    // Validate required fields
    if (!email || !message) {
      console.log("❌ Validation failed - missing required fields");
      return res.status(400).json({
        code: 400,
        status: "Missing required fields: email and message",
      });
    }

    // Check if email is configured
    if (!transporter) {
      console.log("⚠️  Email not configured - returning test response");
      return res.json({
        code: 200,
        status: "Message received (test mode - email not configured)",
        data: { name, email, message: message.substring(0, 100) }
      });
    }

    // Prepare email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
      to: EMAIL_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
        <hr>
        <p><small>Sent from your portfolio website</small></p>
      `,
    };

    // Send email
    console.log("📤 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("✅ Email sent successfully");
    console.log(`   Message ID: ${info.messageId}`);

    return res.json({
      code: 200,
      status: "Message sent successfully",
      messageId: info.messageId,
    });

  } catch (error) {
    console.error("\n❌ Error processing contact form:");
    console.error(`   ${error.message}`);
    console.error(error);

    return res.status(500).json({
      code: 500,
      status: "Failed to send message",
      error: error.message,
    });
  }
});

// ====== ERROR HANDLING ======
app.use((err, req, res, next) => {
  console.error("\n❌ Unhandled error:");
  console.error(err);
  
  res.status(500).json({
    code: 500,
    status: "Internal server error",
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`⚠️  404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    code: 404,
    status: "Not found"
  });
});

// ====== START SERVER ======
app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log("🚀 SERVER STARTED SUCCESSFULLY");
  console.log("=".repeat(50));
  console.log(`📍 Running on: http://localhost:${PORT}`);
  console.log(`📧 Email user: ${EMAIL_USER}`);
  console.log(`🔑 Email password: ${EMAIL_PASS ? "✅ Configured" : "❌ Not configured"}`);
  console.log(`📬 SMTP status: ${transporter ? "✅ Ready" : "⚠️  Not configured"}`);
  console.log("=".repeat(50));
  console.log("\n💡 Waiting for requests...\n");
});

// Handle server errors
app.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use`);
    console.error("   Try stopping other Node processes or use a different port\n");
    process.exit(1);
  } else {
    console.error("\n❌ Server error:", error);
    process.exit(1);
  }
});
