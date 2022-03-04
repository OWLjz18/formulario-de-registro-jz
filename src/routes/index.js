const { Router } = require('express');
const router = Router();
const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== 'production') {

  require('dotenv').config();

}

router.post('/enviar-email', async (req, res) => {

  const { 
    nombre,
    usuario,
    telefono,
    correo,
    password
  } = req.body;

  const enlaceFormulario = 'https://formulario-de-registro-jz.herokuapp.com/';

  const mensaje = `
  <h1>Formulario de Registro JZ</h1>
  
  <p>Acá le dejo sus datos introducidos en el <a href="${enlaceFormulario}">formulario</a>, muchas gracias por probar este proyecto!</p>

  <ul>
    <li>Nombre: ${nombre}</li>
    <li>Usuario: ${usuario}</li>
    ${ (telefono != '') ? `<li>Telefono: ${telefono}</li>` : '' }
    <li>Correo: ${correo}</li>
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
    to: `${nombre} <${correo}>`,
    subject: 'Simulación de registro realizada con éxito!',
    html: mensaje
  });

  console.log('Formulario enviado con éxito!');
  res.redirect('/');

});

module.exports = router;
