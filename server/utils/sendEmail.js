
const nodemailer = require('nodemailer');
const mailtrapTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(mailtrapTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'YOUR_MAILTRAP_USER',
    pass: 'YOUR_MAILTRAP_PASS'
  }
}));

const sendEmail = async (to, subject, text, type, order) => {
  const html = `<h1>${subject}</h1>
    <p>Order ID: ${order._id}</p>
    <p>Customer: ${order.fullName}, ${order.email}</p>
    <p>Product: ${order.product.name} (${order.variant}) x ${order.quantity}</p>
    <p>${text}</p>`;

  await transporter.sendMail({
    from: '"Shop" <noreply@shop.com>',
    to,
    subject,
    text,
    html
  });
};

module.exports = sendEmail;
