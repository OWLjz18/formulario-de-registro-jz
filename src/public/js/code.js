const formulario = document.querySelector('.formulario');
const formularioCampos = document.querySelectorAll('formulario-campo');
const formularioMensaje = document.querySelector('.formulario__mensaje');

const listaCampos = [];

formularioCampos.forEach( campo => {
  
  listaCampos.push({
    nombre: campo.getAttribute('input-id'),
    regexp: new RegExp(campo.getAttribute('input-regexp') ?? ''),
    requerido: campo.getAttribute('requerido') ?? false,
    completado: false
  });

});

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
      
      const campoParaValidar = listaCampos.find(objCampo => objCampo.nombre == campo.inputId);
      
      if ( campoParaValidar.regexp.test(campo.inputValue) ) {
        
        campo.setAttribute('estado', 'exito');
        campoParaValidar.completado = true;
        desactivarMensajeError();
        
      } else {
        
        campo.setAttribute('estado', 'error');
        campoParaValidar.completado = false;
        
      }
      
    }
    
    if (campo.inputId == 'password') {
      
      const password2 = document.querySelector('[input-id="password2"]');
      const campoParaValidar = listaCampos.find(objCampo => objCampo.nombre == 'password2');
      
      if (/^\S/.test(password2.inputValue) && password2.inputValue === campo.inputValue) {
        
        password2.setAttribute('estado', 'exito');
        campoParaValidar.completado = true;
        return;
        
      }
      
      if (/^\S/.test(password2.inputValue) && password2.inputValue !== campo.inputValue) {
        
        password2.setAttribute('estado', 'error');
        campoParaValidar.completado = false;
        return;
        
      }
      
    }
    
    if (campo.inputId == 'password2') {
      
      const password = document.querySelector('[input-id="password"]');
      const campoParaValidar = listaCampos.find(objCampo => objCampo.nombre == campo.inputId);
      
      if (campo.inputValue === password.inputValue && /^\S/.test(campo.inputValue) && /^\S/.test(password.inputValue) ) {
        
        campo.setAttribute('estado', 'exito');
        campoParaValidar.completado = true;
        desactivarMensajeError();
        return;
        
      }
      
      campo.setAttribute('estado', 'error');
      campoParaValidar.completado = false;
      
    }
    
  });
  
  campo.addEventListener('campo-blur', () => {
    
    if (!campo.getAttribute('requerido') && campo.getAttribute('estado') == 'error') {
      
      campo.setAttribute('estado', 'inicial');
      campo.inputValue = '';
      
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