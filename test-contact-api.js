// Test the actual Contact Form API endpoint
// Run with: node test-contact-api.js
// Make sure the dev server is running: npm run dev

const testContactFormAPI = async () => {
  console.log('🧪 Testing Contact Form API Endpoint...\n');

  // Test contact form data
  const testData = {
    name: "Jane Smith",
    email: "jane.smith@testcompany.com",
    phone: "(555) 987-6543", 
    company: "Test Innovations LLC",
    serviceType: "Enterprise Solutions",
    subject: "CRM System Development",
    budget: "$100,000 - $250,000",
    timeline: "6+ months",
    contactMethod: "Phone",
    bestTimeToReach: "Afternoon",
    website: "https://testinnovations.com",
    hearAboutUs: "Referral",
    consent: true,
    message: "We're looking to develop a comprehensive CRM system for our sales team. The system needs to integrate with our existing tools and handle our complex sales pipeline. We'd like to schedule a consultation to discuss our specific requirements and timeline."
  };

  try {
    console.log('📤 Sending test request to contact API...');
    console.log('📋 Test data:', JSON.stringify(testData, null, 2));
    console.log('\n⏳ Making API request...\n');

    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.text();
    
    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    console.log(`📄 Response Body: ${result}`);

    if (response.ok) {
      console.log('\n✅ Contact form API test PASSED!');
      console.log('🎉 Email should have been sent successfully');
      console.log('\n📧 Check your email configuration:');
      console.log('   - Development: Look for Ethereal preview URL in server logs');
      console.log('   - Production: Check simplehostingserverd@proton.me');
      
      console.log('\n💡 Tips:');
      console.log('   - Watch the terminal where you ran "npm run dev"');
      console.log('   - Look for email preview URLs in the logs');
      console.log('   - Check email spam folder if using real SMTP');
    } else {
      console.log('\n❌ Contact form API test FAILED!');
      console.log('🔧 Check your email configuration in the mailer');
      
      if (result.includes('configuration error')) {
        console.log('\n📝 Email configuration issues:');
        console.log('   - Make sure SMTP settings are correct');
        console.log('   - In development, it should use Ethereal automatically');
        console.log('   - Check the mailer.ts file for any connection errors');
      }
    }

  } catch (error) {
    console.error('\n❌ API test failed with error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔧 Server not running:');
      console.log('   1. Make sure dev server is running: npm run dev');
      console.log('   2. Check that port 3000 is available');
      console.log('   3. Wait for server to fully start before running test');
    } else {
      console.log('\n🔧 Troubleshooting:');
      console.log('   - Ensure the dev server is running (npm run dev)');
      console.log('   - Check server logs for detailed error messages');
      console.log('   - Verify your network connection');
    }
  }
};

// Instructions
console.log('📋 Contact Form API Test');
console.log('========================\n');
console.log('🚀 Before running this test:');
console.log('   1. Start the development server: npm run dev');
console.log('   2. Wait for "Ready on http://localhost:3000"');
console.log('   3. Then run this test script\n');

// Run test after a short delay to show instructions
setTimeout(testContactFormAPI, 2000);