import esRequerido from './es-requerido.js';

const formulario = document.querySelector('.formulario');
const formularioCampos = document.querySelectorAll('formulario-campo');
const formularioMensaje = document.querySelector('.formulario__mensaje');

const listaCampos = [
  {
    campo: 'nombre',
    regexp: /^[a-zA-Z\s]{4,20}$/,
    requerido: esRequerido('nombre'),
    completado: false
  },
  {
    campo: 'usuario',
    regexp: /^[a-zA-Z0-9\.\_\-\s]{4,20}$/,
    requerido: esRequerido('usuario'),
    completado: false
  },
  {
    campo: 'telefono',
    regexp: /^\d{10,15}$/,
    requerido: esRequerido('telefono'),
    completado: false
  },
  {
    campo: 'correo',
    regexp: /^[a-zA-Z0-9\.\-\_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
    requerido: esRequerido('correo'),
    completado: false
  },
  {
    campo: 'password',
    regexp: /^[^\s]{6,16}$/,
    requerido: esRequerido('password'),
    completado: false
  },
  {
    campo: 'password2',
    requerido: esRequerido('password2'),
    completado: false
  }
]; 

const totalCamposRequeridos = () => listaCampos.filter(objCampo => objCampo.requerido).length;
const totalCamposCompletados = () => listaCampos.filter(objCampo => objCampo.completado).length;

const desactivarMensajeError = () => {
  
  if (totalCamposCompletados() >= totalCamposRequeridos()) {
    
    if (formularioMensaje.classList.contains('formulario__mensaje--activo')) {
      
      formularioMensaje.classList.remove('formulario__mensaje--activo');
      
    }
    
  }
  
};

formularioCampos.forEach( campo => {
  
  campo.addEventListener('keyup', () => {
    
    if (campo.inputId !== 'password2') {
      
      const validadorCampo = listaCampos.find(objCampo => objCampo.campo == campo.inputId);
      
      if ( validadorCampo.regexp.test(campo.inputValue) ) {
        
        campo.setAttribute('estado', 'exito');
        validadorCampo.completado = true;
        desactivarMensajeError();
        
      } else {
        
        campo.setAttribute('estado', 'error');
        validadorCampo.completado = false;
        
      }
      
    }
    
    if (campo.inputId == 'password') {
      
      const password2 = document.querySelector('[input-id="password2"]');
      const validadorCampo = listaCampos.find(objCampo => objCampo.campo == 'password2');
      
      if (/^\S/.test(password2.inputValue) && password2.inputValue === campo.inputValue) {
        
        password2.setAttribute('estado', 'exito');
        validadorCampo.completado = true;
        return;
        
      }
      
      if (/^\S/.test(password2.inputValue) && password2.inputValue !== campo.inputValue) {
        
        password2.setAttribute('estado', 'error');
        validadorCampo.completado = false;
        return;
        
      }
      
    }
    
    if (campo.inputId == 'password2') {
      
      const validadorCampo = listaCampos.find(objCampo => objCampo.campo == campo.inputId);
      
      const password = document.querySelector('[input-id="password"]');
      
      if (campo.inputValue === password.inputValue && /^\S/.test(campo.inputValue) && /^\S/.test(password.inputValue) ) {
        
        campo.setAttribute('estado', 'exito');
        validadorCampo.completado = true;
        desactivarMensajeError();
        return;
        
      }
      
      campo.setAttribute('estado', 'error');
      validadorCampo.completado = false;
      
    }
    
  });
  
  campo.addEventListener('campo-blur', () => {
    
    if (!campo.getAttribute('requerido') && campo.getAttribute('estado') == 'error') {
      
      campo.inputValue = '';
      campo.setAttribute('estado', 'inicial');
      
    } 
    
  });
  
});

// Hacer que la contraseña sea visible al hacer doble toque en los campos de contraseñas

const camposPassword = document.querySelectorAll('[input-id^="password"]');

camposPassword.forEach( campoPassword => { 
  
  campoPassword.addEventListener('dblclick', () => {
    
    if (campoPassword.getAttribute('input-type') === 'password') {
      
      campoPassword.setAttribute('input-type', 'text');
      return;
      
    }
   
    campoPassword.setAttribute('input-type', 'password');
    
  });
  
  campoPassword.addEventListener('campo-blur', () => campoPassword.setAttribute('input-type', 'password') );

});

// Evento de enviado

formulario.addEventListener('submit', event => {

  event.preventDefault();
  
  if ( totalCamposCompletados() < totalCamposRequeridos() ) {

    formularioMensaje.classList.add('formulario__mensaje--activo');

    const camposRequeridos = listaCampos.filter(objCampo => objCampo.requerido);
    const nombreCamposIncompletos = camposRequeridos.filter(objCampo => !objCampo.completado).map(objCampo => objCampo.campo);

    nombreCamposIncompletos.forEach(campoIncompleto => document.querySelector(`[input-id="${campoIncompleto}"]`).setAttribute('estado', 'error'));
    return;

  }

  if (formularioMensaje.classList.contains('formulario__mensaje--activo')) {

    formularioMensaje.classList.remove('formulario__mensaje--activo');

  }

  formulario.submit();

});