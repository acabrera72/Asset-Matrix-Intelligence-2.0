# Guía de Presentación paso a paso para tu Profesor

Esta guía está diseñada como un "guion" para que sepas exactamente qué hacer, dónde hacer clic y qué decir cuando le estés mostrando el proyecto a tu profesor.

La forma más fácil y profesional de presentar esta API es utilizando la **interfaz de Swagger** que tienes instalada.

---

## 🚀 Paso 0: Preparativos (Antes de que llegue el profesor)
1. Asegúrate de tener el servidor corriendo (`npm start` en tu terminal).
2. Abre tu navegador y ve a: [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
3. Ten esta página lista en pantalla completa.

---

## 🎬 Paso 1: Introducción y Modelos de Datos (Schemas)
**Qué decir:** 
*"Profesor, esta es mi API REST para gestionar la matriz de activos financieros. Está desarrollada en Node.js con Express y conectada a MongoDB Atlas en la nube."*

**Qué mostrar (Schemas):**
- Desplázate hacia el final de la página de Swagger hasta la sección verde que dice **"Schemas"**.
- Despliega el esquema de **User** y el esquema de **Asset**.
- **Qué te va a pedir el profesor:** Seguramente te pedirá que expliques qué datos guardas.
- **Tu respuesta:** *"Como puede ver en los Schemas, en User guardo el nombre, email, y contraseña (encriptada con bcrypt). En Asset guardo el nombre del activo, el símbolo (como BTC o AAPL), el tipo (crypto, stock, fiat) y el precio. Además, cada activo está referenciado (unido) al ID del usuario que lo creó."*

---

## 🎬 Paso 2: Demostrar el Registro y Autenticación (POST)
**Qué te va a pedir el profesor:** *"Demuéstrame cómo se registra un usuario y cómo se protege la API."*

**Qué hacer (Paso a paso en pantalla):**
1. Sube a la sección **Auth**.
2. Despliega la ruta `POST /api/auth/register`.
3. Haz clic en el botón blanco **"Try it out"** (a la derecha).
4. En la caja de texto (Request body), inventa un usuario:
   ```json
   {
     "name": "Profesor",
     "email": "profesor@ejemplo.com",
     "password": "password123"
   }
   ```
5. Dale clic al botón azul grande **"Execute"**.
6. Desplázate un poco hacia abajo hasta **"Server response"**. Muéstrale al profesor que el código de respuesta es `201` y que el sistema devolvió un token larguísimo.
7. **Copia ese Token** (solo el texto largo, sin las comillas).
8. Sube al principio de toda la página y dale clic al botón verde **"Authorize"** (con un candado).
9. Pega tu Token ahí y dale a **"Authorize"** y luego a **"Close"**.
10. **Qué decir:** *"Con esto acabo de registrar al usuario y he guardado su Token JWT en las cabeceras de autorización. Ahora la API sabe quién soy y me dejará acceder a mis rutas privadas."*

---

## 🎬 Paso 3: Demostrar la Creación de un Activo (POST)
**Qué te va a pedir el profesor:** *"Ahora crea un activo para ese usuario."*

**Qué hacer:**
1. Ve a la sección **Assets** y despliega `POST /api/assets`.
2. Dale a **"Try it out"**.
3. En el body pon:
   ```json
   {
     "name": "Bitcoin",
     "symbol": "BTC",
     "type": "crypto",
     "price": 65000
   }
   ```
4. Dale a **"Execute"**.
5. Muestra que la respuesta es un código `201` y que el activo se guardó correctamente.
6. *(Opcional)*: Crea un segundo activo rápidamente, por ejemplo, "Apple" de tipo "stock" con precio "180".

---

## 🎬 Paso 4: Demostrar la Lectura de Activos (GET)
**Qué te va a pedir el profesor:** *"Enséñame que esos datos de verdad se guardaron y cómo los consultas."*

**Qué hacer:**
1. En la misma sección **Assets**, despliega `GET /api/assets`.
2. Dale a **"Try it out"** y directamente a **"Execute"**.
3. Baja a la respuesta y muéstrale el JSON.
4. **Qué decir:** *"Como ve, el endpoint GET me devuelve un código 200 y me trae exactamente los activos que acabo de crear. Como la ruta está protegida, solo me trae los activos del usuario logueado en este momento."*
5. **Copia el `_id`** de uno de los activos que aparezcan en esa lista (lo necesitarás para el siguiente paso).

---

## 🎬 Paso 5: Demostrar la Analítica (GET)
**Qué decir antes de hacerlo:** *"Además del CRUD básico, implementé un endpoint de analíticas que calcula el portafolio en tiempo real."*

**Qué hacer:**
1. Ve a la sección **Analytics** y despliega `GET /api/analytics/portfolio`.
2. Dale a **"Try it out"** y luego a **"Execute"**.
3. Muéstrale la respuesta. Se verá el valor total de la cuenta sumado, la cantidad de activos que tienes, y el valor separado por categorías (cuánto tienes en crypto, cuánto en stock, etc.). A los profesores les encanta ver que la API procesa datos y no solo guarda información.

---

## 🎬 Paso 6: Demostrar la Eliminación (DELETE)
**Qué te va a pedir el profesor:** *"Borra uno de los activos para ver si funciona."*

**Qué hacer:**
1. Ve a la sección **Assets** y despliega `DELETE /api/assets/{id}`.
2. Dale a **"Try it out"**.
3. En el campo vacío que dice **`id`**, pega el `_id` del activo que copiaste en el paso 4.
4. Dale a **"Execute"**.
5. Muestra que el código de respuesta es `200` y el mensaje de éxito.
6. **Para rematar:** Vuelve a subir a la ruta `GET /api/assets`, dale a "Execute" nuevamente y muéstrale al profesor que el activo efectivamente ya no aparece en la lista.

---

## 💡 Preguntas trampa que te puede hacer el profesor:

1. **¿Qué pasa si intento hacer una petición GET sin estar logueado?**
   *Respuesta tuya:* "El middleware de autorización (`protect`) detectará que no hay token en la cabecera (header) y me devolverá un error 401 (Not Authorized), bloqueando la petición."
2. **¿Por qué la contraseña no se ve en la base de datos?**
   *Respuesta tuya:* "Porque antes de guardar al usuario (usando un middleware `pre('save')` de Mongoose), la contraseña pasa por un proceso de hashing usando la librería `bcryptjs`. Ni siquiera yo como administrador puedo ver su contraseña real."
3. **¿De dónde viene la documentación que me estás mostrando (Swagger)?**
   *Respuesta tuya:* "Swagger lee unos comentarios especiales en formato YAML que dejé escritos justo arriba de cada ruta en mi código fuente. A partir de esos comentarios, genera esta interfaz visual."
