const formularioCampo = class extends HTMLElement {
  
  constructor() {
    super();
    
    this.titulo = this.getAttribute('titulo') ?? 'Sin Titulo';
    this.inputId = this.getAttribute('input-id') ?? '#';
    this.mensajeError = this.getAttribute('mensaje-error') ?? '';
    this.mensajeEjemplo = this.getAttribute('mensaje-ejemplo') ?? 'Buscar...';
    
    this._inputType = this.getAttribute('input-type') ?? 'text';
    this._autocompletar = this.getAttribute('autocompletar') ?? 'off';
  }
  
  _render() {
    
    const campo = document.createElement('div');
    campo.setAttribute('class', 'campo');
    
    const label = document.createElement('label');
    label.setAttribute('class', 'campo__titulo');
    label.setAttribute('for', `campo__input--${this.inputId}`);
    label.innerHTML = this.titulo;
    
    const inputContenedor = document.createElement('div');
    inputContenedor.setAttribute('class', 'campo__input--contenedor');
    
    const input = document.createElement('input');
    input.setAttribute('type', this._inputType);
    input.setAttribute('name', this.inputId);
    input.setAttribute('class', 'campo__input');
    input.setAttribute('id', `campo__input--${this.inputId}`);
    input.setAttribute('autocomplete', this._autocompletar);
    input.setAttribute('placeholder', this.mensajeEjemplo);
    
    const iconoValidacion = document.createElement('jz-x');
    iconoValidacion.setAttribute('class', 'campo__iconoValidacion');
    iconoValidacion.setAttribute('s', '28px');
    iconoValidacion.setAttribute('f', 'transparent');
    iconoValidacion.setAttribute('c', 'var(--color-error)');
    
    const mensaje_error = document.createElement('p');
    mensaje_error.setAttribute('class', 'campo__mensajeError');
    mensaje_error.innerHTML = this.mensajeError;
    
    inputContenedor.append(input, iconoValidacion);
    campo.append(label, inputContenedor, mensaje_error);
    
    this.appendChild(campo);
    
    const eventoBlur = new CustomEvent('campo-blur', { bubbles: true });
    
    input.addEventListener('blur', () => campo.dispatchEvent(eventoBlur));
    
  }
  
  set inputValue(valor) {
    
    this.querySelector('.campo__input').value = valor;
    
  }
  
  get inputValue() {
    
    return this.querySelector('.campo__input').value;
    
  }

  _validarEstado(valorEstado) {
    
    const campo = this.querySelector('.campo');
    
    const iconoValidacion = this.querySelector('.campo__iconoValidacion');
    iconoValidacion.setAttribute('c', `var(--color-${valorEstado})`);
    
    if (valorEstado == 'inicial') {
      
      campo.classList.remove('campo--error', 'campo--exito');
      
    }
    
    if (valorEstado == 'exito') {
      
      campo.classList.remove('campo--error');
      campo.classList.add('campo--exito');
      
      iconoValidacion.setAttribute('change-iconejz', 'jz-ck');
      
    }
    
    if (valorEstado == 'error') {
      
      campo.classList.remove('campo--exito');
      campo.classList.add('campo--error');
      
      iconoValidacion.removeAttribute('change-iconejz');
      
    }
    
  }
  
  _actualizarContenido(nombreAtributo, valorAtributo) {
    
    switch (nombreAtributo) {
      
      case 'titulo':
          this.querySelector('.campo__titulo').innerHTML = valorAtributo;
        break;
        
      case 'estado':
          this._validarEstado(valorAtributo);
        break;
        
      case 'requerido':
          if (this.getAttribute('requerido')){
            this.querySelector('.campo').classList.add('campo--requerido');
          }
        break;
        
      case 'input-type':
          this.querySelector('.campo__input').type = valorAtributo;
        break;
        
      case 'mensaje-ejemplo':
          this.querySelector('.campo__input').placeholder = valorAtributo;
        break;
      
      case 'mensaje-error':
          this.querySelector('.campo__mensajeError').innerHTML = valorAtributo;
        break;
        
      default:
        console.warn(`"formulario-campo": No hay actualizaciones para el atributo ${nombreAtributo}`);
        
    }
    
  }
  
  connectedCallback() {
    
    this._render();
    
  }
  
  static get observedAttributes() {
    return ['titulo', 'estado', 'requerido', 'input-type', 'input-id', 'mensaje-error', 'mensaje-ejemplo', 'autocompletar'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    
    if (newValue !== null && name !== 'input-id') {
      
      setTimeout(() => this._actualizarContenido(name, newValue));
      
    }
    
    if (name == 'estado' && newValue == null) {
      
      this._validarEstado('inicial');
      
    }
    
  }
  
}

customElements.define('formulario-campo', formularioCampo);
