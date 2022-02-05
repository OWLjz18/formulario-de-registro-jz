<h1 align="center"> Formulario de registro </h1>

Es un formulario de registro, del cuál cada campo es validado por su respectiva expresión regular. 

Cada campo está "envuelto" por un componente, que se encarga de recibir:

  * _**requerido**_ => Es un valor booleano que indica si obligatoriamente debe comportarse el campo.
  * _**titulo**_ => Es lo que se mostrará como el titulo del campo.
  * _**input-id**_ => Este atributo simula ser un **id** "particular".
  * _**mensaje-ejemplo**_ => Es lo que se le colocará como _"placeholder"_.
  * _**mensaje-error**_ => Es el mensaje que se mostrará solo sí el contenido del campo no coincide con lo solicitado.

_**Nota:**_ Es importante recordar que al cada componente tener su propio ShadowDOM, no puede leer los estilos que estén en el LighyDOM, por ende en el archivo ["formulario_campo.js"](/componentes/formulario_campo.js) verán que creé un elemento **link** del cuál su **"href"** empieza desde la raíz del proyecto, así que tengan en cuenta que al mover esa carpeta, deberán modificar la ruta.