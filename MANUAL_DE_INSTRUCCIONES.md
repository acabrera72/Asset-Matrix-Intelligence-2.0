# 📘 Manual de Instrucciones: AssetMatrix Intelligence API

Bienvenido al manual oficial de tu proyecto. Aquí aprenderás exactamente cómo está construido tu código, para qué sirve cada carpeta y archivo, y cómo ejecutar y probar todo el sistema de manera profesional.

---

## 🏗️ 1. Entendiendo la Estructura del Código (Arquitectura)
Tu proyecto sigue una arquitectura profesional muy conocida llamada **MVC** (Adaptada para APIs) y **separación de responsabilidades**. Cada carpeta tiene una única función específica.

Todo el código importante vive dentro de la carpeta `/src`. Así es como se divide:

### Archivos Principales
- **`src/server.js`**: Es el **interruptor de encendido**. Su único trabajo es conectarse a la base de datos (MongoDB) y encender el servidor en el puerto 3000.
- **`src/app.js`**: Es el **cerebro de la aplicación**. Aquí se configura Express, se habilitan las protecciones (CORS), se configura Swagger y se le dice a la app dónde encontrar todas las rutas.

### Carpetas de Lógica
- **📂 `src/routes/` (Los Caminos):** 
  Aquí se definen las "URLs" a las que se puede entrar (ej. `/api/users`, `/api/assets`). No hacen trabajo pesado, solo dicen *"si alguien entra aquí, manda a llamar a tal Controlador"*.
- **📂 `src/controllers/` (Los Gerentes):** 
  Toman las decisiones. Reciben la petición del usuario, buscan los datos en la base de datos, y le responden al usuario con un JSON (Éxito o Error).
- **📂 `src/models/` (Los Moldes):** 
  Aquí usas *Mongoose* para definir cómo se guardan las cosas en MongoDB. Por ejemplo, el modelo del Usuario dice: *"Todo usuario debe tener un nombre, un correo, y una contraseña encriptada"*.
- **📂 `src/middlewares/` (Los Guardias de Seguridad):** 
  Son funciones que se ejecutan *antes* de llegar al controlador.
  - Ejemplo 1: Un middleware que verifica si tu Token (JWT) es válido. Si no lo es, te rebota y te dice "No autorizado".
  - Ejemplo 2: Un middleware que atrapa errores globales.
- **📂 `src/validations/` (Los Inspectores):** 
  Aquí usas *Zod*. Revisan que la información que envíe el usuario esté perfecta *antes* de guardarla. (Ej: Que el email tenga `@`, que la contraseña sea segura, etc).
- **📂 `src/config/` (Configuraciones):** 
  Archivos que preparan herramientas externas. Aquí se configura la conexión a MongoDB y cómo se genera la documentación visual de Swagger.

### Otras Carpetas
- **📂 `/tests/`**: Fuera de `src`. Aquí están las pruebas automatizadas (Jest). Son pequeños robots que prueban tu código por ti para asegurar que no se haya roto nada.
- **📄 `.env`**: Un archivo súper secreto (que nunca se sube a GitHub) donde guardas tus contraseñas reales de base de datos y tus claves secretas de JWT.

---

## 🚀 2. ¿Cómo ejecutar el Proyecto?
El proyecto tiene 3 "modos" de encendido, que se controlan mediante la terminal en la carpeta principal del proyecto:

### A. Modo Desarrollo (El que más usarás)
Comando: `npm run dev`
- **¿Qué hace?** Enciende el servidor usando `nodemon`. Si haces un cambio en algún archivo de código y lo guardas, el servidor **se reiniciará solo** en un segundo. Es ideal para programar rápido.

### B. Modo Producción
Comando: `npm start`
- **¿Qué hace?** Enciende el servidor usando `node` normal. No se reinicia si haces cambios. Es el comando que se usaría si subes tu proyecto a un servidor real en la nube (AWS, Render, etc).

### C. Modo Pruebas (Auditoría)
Comando: `npm test`
- **¿Qué hace?** No enciende el servidor. En su lugar, ejecuta todos los archivos de la carpeta `/tests` y verifica que la seguridad, las rutas y los modelos sigan funcionando perfectamente.

---

## 👁️ 3. ¿Cómo interactuar con la API? (La Interfaz)
Como eres un desarrollador Backend, tu "interfaz" no es una página web normal, es **Swagger**.

1. Asegúrate de tener el servidor encendido (`npm run dev`).
2. Abre tu navegador de internet.
3. Ve a la dirección: **`http://localhost:3000/api-docs`**

Allí verás el panel de control. 
- Puedes registrar un usuario en `POST /api/auth/register` (le das a "Try it out", cambias el correo y contraseña en la caja de texto y le das a "Execute").
- Luego puedes iniciar sesión en `POST /api/auth/login` para que te devuelva tu Token de seguridad.
- Puedes usar ese Token para consultar las rutas protegidas como los Activos Financieros (Assets) o las Analíticas.
