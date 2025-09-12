// Simple Contact Form Email Test Script
// Run with: node test-email.js

const nodemailer = require('nodemailer');

// Test data that mimics a contact form submission
const testContactData = {
  name: "John Doe",
  email: "john.doe@example.com", 
  phone: "(555) 123-4567",
  company: "Test Company Inc",
  serviceType: "Web Development",
  subject: "Website Development Inquiry",
  budget: "$25,000 - $50,000",
  timeline: "3-6 months",
  contactMethod: "Email",
  bestTimeToReach: "Morning",
  website: "https://example.com",
  hearAboutUs: "Google Search",
  message: "Hi, I'm interested in developing a new website for our company. We need a modern, responsive design with e-commerce capabilities. Could we schedule a consultation to discuss our requirements?"
};

async function testEmailLocally() {
  console.log('🧪 Testing Contact Form Email...\n');

  try {
    // Create Ethereal test account (works without any configuration)
    console.log('📧 Creating test email account...');
    const testAccount = await nodemailer.createTestAccount();
    
    console.log('✅ Test account created:');
    console.log(`   📮 Email: ${testAccount.user}`);
    console.log(`   🔑 Password: ${testAccount.pass}\n`);

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    // Build email content (same as the real mailer)
    const buildHtmlEmail = (data) => {
      const lines = [];
      lines.push("<h2>New Contact Form Submission</h2>");
      lines.push('<table cellspacing="0" cellpadding="6" style="border-collapse:collapse">');
      
      const addRow = (label, value) => {
        if (!value) return;
        lines.push(
          `<tr><td style="font-weight:600;border-bottom:1px solid #eee">${label}</td><td style="border-bottom:1px solid #eee">${value}</td></tr>`
        );
      };

      addRow("Name", data.name);
      addRow("Email", data.email);
      addRow("Phone", data.phone);
      addRow("Company", data.company);
      addRow("Website", data.website);
      addRow("Service Type", data.serviceType);
      addRow("Project Subject", data.subject);
      addRow("Budget", data.budget);
      addRow("Timeline", data.timeline);
      addRow("Preferred Contact Method", data.contactMethod);
      addRow("Best Time to Reach", data.bestTimeToReach);
      addRow("Heard About Us", data.hearAboutUs);
      addRow("Message", data.message);
      
      lines.push("</table>");
      return lines.join("");
    };

    const buildTextEmail = (data) => {
      const fields = [
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Company", data.company],
        ["Website", data.website],
        ["Service Type", data.serviceType],
        ["Project Subject", data.subject],
        ["Budget", data.budget],
        ["Timeline", data.timeline],
        ["Preferred Contact Method", data.contactMethod],
        ["Best Time to Reach", data.bestTimeToReach],
        ["Heard About Us", data.hearAboutUs],
        ["Message", data.message],
      ];
      
      return fields
        .filter(([, v]) => !!v)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
    };

    // Send test email
    console.log('📤 Sending test email...');
    
    const subjectBase = testContactData.subject || "New Contact Message";
    const subject = `${subjectBase} - ${testContactData.name} (${testContactData.serviceType})`;

    const info = await transporter.sendMail({
      from: 'noreply@softwarepros.org',
      to: 'simplehostingserverd@proton.me',
      replyTo: testContactData.email,
      subject,
      text: buildTextEmail(testContactData),
      html: buildHtmlEmail(testContactData),
    });

    console.log('✅ Email sent successfully!');
    console.log(`📧 Message ID: ${info.messageId}`);
    
    // Get preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('\n🌐 View the email in your browser:');
      console.log(`   ${previewUrl}`);
      console.log('\n💡 This shows exactly what the recipient would see!');
    }
    
    console.log('\n🎉 Contact form email test completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Click the preview URL above to see the email');
    console.log('   2. Verify all contact data is displayed correctly');
    console.log('   3. Test with different form data if needed');
    console.log('   4. Configure SMTP settings for production deployment');

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   - Check your internet connection');
    console.log('   - Make sure nodemailer is installed: npm install nodemailer');
    console.log('   - Try running the test again');
  }
}

// Run the test
testEmailLocally();