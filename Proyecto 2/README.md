### Esta es la Practica No. 2 de la materia de Programacion Avanzada impartida por el maestro Gabriel Villalona en la Pontificia Universidad Catolica Madre y Maestra (PUCMM).

Url para clonar el repositorio
``` bash
git clone https://github.com/Diegomarte9/Practica2.git
```

##### Practica No. 2 Valor 5 Ptos

1- Crear un repositorio de git para el proyecto.

2- Crear un proyecto utilizando npm.

3- Crear una app en nodejs que utilice el framework express

4- Crear los endpoint que permitan simular las operaciones de CRUD hacia una base de datos Mysql hacia

una tabla de persona que tenga los campos: idpersona int, cedula varchar, nombre varchar, apellido varchar, telefono varchar, email varchar.

Nota: CRUD = Create Read Update Delete.

Entregable: comprimir la carperta con winrar y subir a la plataforma.

##### Para obtener, eliminar y actualizar personas por ID es http://localhost:3000/personas/"id de la persona que quieres buscar"

Ejemplo

```bash
http://localhost:3000/personas/21
```

#### JSON para actualizar personas:

{
    "cedula": "402-1443364-7",
    "nombre": "Diego",
    "apellido": "Marte",
    "telefono": "849-244-2511",
    "email": "diegomarte9@gmail.com"
}