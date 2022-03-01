export default function (selector) {

  const elemento = document.querySelector(`[input-id="${selector}"]`);

  return Boolean(elemento.getAttribute('requerido')) ?? false;

};