const nodemailer = require('nodemailer');
const routes = require('express').Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

routes.get('/', async (req, res) => res.render('index'));
routes.get('/about', async (req, res) => res.render('about'));
routes.get('/services', async (req, res) => res.render('services'));
routes.get('/contact', async (req, res) => res.render('contact', { message: null }));

routes.post('/contact', async (req, res) => {
    const { name, email, phone, service, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT,
        subject: `Nouvelle demande de contact - ${service || 'Général'}`,
        html: `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone}</p>
      <p><strong>Service demandé:</strong> ${service || 'Non spécifié'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.render('contact', {
            message: {
                type: 'success',
                text: 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.'
            }
        });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        res.render('contact', {
            message: {
                type: 'error',
                text: 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
            }
        });
    }
});

module.exports = routes;