const nodemailer = require('nodemailer');

// Email configuration
const createTransport = () => {
  return nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
      user: process.env.EMAIL_USER, // Your email (e.g., your-app@gmail.com)
      pass: process.env.EMAIL_PASSWORD // App password (not your regular password)
    }
  });
};

// Contact form controller
const submitContactForm = async (req, res) => {
  try {
    const { email, subject, message, category } = req.body;

    // Basic validation
    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    } 

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const transporter = createTransport();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'poprich020@gmail.com',
      subject: `PulseSurvey Contact: ${category.toUpperCase()} - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b, #f97316); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
              <p><strong>From:</strong> ${email}</p>
              <p><strong>Category:</strong> ${category.charAt(0).toUpperCase() + category.slice(1)}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 15px; padding: 10px; background: #e3f2fd; border-radius: 5px; font-size: 12px; color: #666;">
              <p style="margin: 0;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 5px 0 0 0;"><strong>Source:</strong> PulseSurvey Contact Form</p>
            </div>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or contact us directly.'
    });
  }
};

module.exports = {
  submitContactForm
};