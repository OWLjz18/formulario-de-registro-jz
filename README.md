<h1 align="center"> Formulario de registro JZ </h1>

Es un formulario de registro, que envía los datos al correo especificado en el campo "correo".

Cada campo está "envuelto" por un componente, que se encarga de recibir los siguientes parametros:

  * _**titulo**_ => Es lo que se mostrará como el titulo del campo (label).
  * _**requerido**_ => Es un valor booleano que indica si obligatoriamente debe completarse el campo.
  * _**input-id**_ => Este atributo simula ser un **id** "particular" para el input contenido en cada componente.
  * _**input-type**_ => Especifica el **"type"** que tendrá el input dentro del componente, por defecto su valor será **"text"**.
  * _**input-regexp**_ => Aquí se especifica la expresión regular con la que se validará el contenido del input que esta dentro del componente.
  * _**mensaje-ejemplo**_ => Es lo que se le colocará como _"placeholder"_ en el input correspondiente.
  * _**mensaje-error**_ => Es el mensaje que se mostrará solo sí el contenido del campo no coincide con lo solicitado.
