// EmailJS Configuration
// Follow these steps to set up EmailJS:

// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an Email Service:
//    - Go to "Email Services" in the dashboard
//    - Click "Add New Service"
//    - Choose Gmail (or your preferred email provider)
//    - Connect your email account
//    - Copy the Service ID

// 3. Create an Email Template:
//    - Go to "Email Templates" in the dashboard
//    - Click "Create New Template"
//    - Use these template variables in your email template:
//      {{from_name}} - Sender's name
//      {{from_email}} - Sender's email
//      {{advisory_focus}} - The selected question/topic
//      {{message}} - The message content
//      {{to_email}} - Your email (work.manishwadhwani@gmail.com)
//    - Example template:
//      Subject: New Contact Form Submission from {{from_name}}
//      
//      You have received a new message from your portfolio contact form.
//      
//      Name: {{from_name}}
//      Email: {{from_email}}
//      Advisory Focus: {{advisory_focus}}
//      
//      Message:
//      {{message}}
//    - Save and copy the Template ID

// 4. Get your Public Key:
//    - Go to "Account" > "General"
//    - Copy your Public Key

// 5. Replace the values below with your actual credentials:

export const EMAILJS_CONFIG = {
    serviceId: 'service_via376e',      // Replace with your Service ID
    templateId: 'template_iy7nvye',    // Replace with your Template ID
    publicKey: 'P2uzQYSAmUPQI1zRs'       // Replace with your Public Key
};

// After updating these values, the contact form will automatically send emails to:
// work.manishwadhwani@gmail.com
