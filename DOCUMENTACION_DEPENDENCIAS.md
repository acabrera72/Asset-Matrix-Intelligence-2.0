# Control y Auditoría: Librerías y Dependencias del Proyecto
Este documento sirve como registro técnico de todas las herramientas instaladas en el sistema para desarrollar la API de **AssetMatrix Intelligence**. Te permitirá entender qué hace cada una y cómo desinstalarlas si en el futuro decides eliminar el proyecto de tu computadora.

## Entorno de Ejecución Principal
- **Node.js (v20+)**: El motor que permite ejecutar Javascript en tu computadora (fuera del navegador).
  - *Desinstalación (Ubuntu/Linux)*: `sudo apt-get remove nodejs npm`

## Dependencias de Producción (Se van con tu app a la nube)
Instaladas vía `npm install`. Se guardan en la carpeta `node_modules` de tu proyecto.
- **express**: Framework web. Nos permitió crear el servidor y recibir peticiones HTTP (`GET`, `POST`) de forma sencilla.
- **mongoose**: Es el "traductor" entre tu código Node.js y la base de datos MongoDB. Nos dejó crear Modelos como `User.js`.
- **dotenv**: Lee el archivo `.env` para ocultar tus contraseñas y claves secretas (como la URI de Atlas).
- **cors**: Capa de seguridad básica de los navegadores. Permite que un frontend (como React o Vanilla JS) pueda hacerle peticiones a tu API sin ser bloqueado.
- **bcryptjs**: Algoritmo criptográfico estándar de la industria. Lo usamos para convertir la contraseña "123456" en un código ilegible (`$2a$10$....`) en la base de datos.
- **jsonwebtoken (JWT)**: Sistema de "llaves virtuales". Lo usamos para generar un Token codificado cuando alguien hace Login.
- **zod**: El escudo de validación. Revisa estrictamente el formato de los correos, números y textos antes de que lleguen a los controladores.
- **swagger-ui-express & swagger-jsdoc**: Generaron la página visual e interactiva en `/api-docs` leyendo los comentarios que escribimos en las rutas.

## Dependencias de Desarrollo (Solo para programar)
No se suben a los servidores en producción.
- **nodemon**: El demonio que reinicia tu servidor automáticamente cada vez que guardas un archivo con `Ctrl+S`.
- **jest & supertest**: La pareja de Testing. `Jest` es el motor que evalúa las pruebas ("espera que 1+1 sea 2"), y `Supertest` es el robot que simula ser un usuario haciendo peticiones a tu API falsa.

## Instalaciones Manuales en tu Sistema
- **mongodb**: Instalaste manualmente el driver base de mongo con `npm install mongodb`. Aunque Mongoose ya lo traía por debajo, tenerlo no afecta en absoluto.

---

### ¿Cómo eliminar absolutamente TODO esto en el futuro?

Si algún día quieres limpiar tu disco duro de todo rastro de este backend, solo tienes que seguir estos 3 pasos:

1. **Borrar el proyecto local:**
   Simplemente elimina la carpeta raíz del proyecto y todas sus dependencias locales se irán con él.
   ```bash
   rm -rf /home/acabrera23/Descargas/Asset-Matrix-Intelligence
   ```

2. **(Opcional) Borrar Node.js de tu computadora:**
   Si no vas a programar nunca más en Node.js, quítalo de tu sistema Linux:
   ```bash
   sudo apt-get purge nodejs npm
   sudo apt-get autoremove
   ```

3. **Borrar Base de Datos en la Nube:**
   Ve a `mongodb.com`, entra a tu cuenta de Atlas, ve a las opciones de tu Cluster y haz clic en **"Terminate"** (Terminar/Eliminar Cluster). Esto borrará los datos de la nube.
