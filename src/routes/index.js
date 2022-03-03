const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');
const fs = require('fs');

require('dotenv').config();

router.post('/send-email', async (req, res) => {

  const { 
    nombre: name,
    usuario: username,
    telefono: phone,
    correo: email,
    password
  } = req.body;

  const message = `
  <h1>Formulario de Registro JZ</h1>
  
  <p>Acá le dejo sus datos introducidos en el <a href="https://owljz18.github.io/formulario-de-registro-js">formulario</a>, muchas gracias por probar este proyecto!</p>

  <ul>
    <li>Nombre: ${name}</li>
    <li>Usuario: ${username}</li>
    ${ (phone != '') ? `<li>Telefono: ${phone}</li>` : '' }
    <li>Correo: ${email}</li>
    <li>Contraseña: ${password}</li>
  </ul>
  `;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: `Formulario de registro JZ <${process.env.USER_EMAIL}>`,
    to: `${name} <${email}>`,
    subject: 'Simulación de registro realizada con éxito!',
    html: message
  });

  console.log('Formulario enviado con éxito!');
  res.redirect('/');

});

module.exports = router;
