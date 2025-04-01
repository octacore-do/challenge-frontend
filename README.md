# Prueba Técnica - Front-End Developer (VueJS)

Se debe desarrollar una aplicación sencilla utilizando **VueJS** que cumpla con las siguientes características:

---

## 1. Inicio de Sesión (Login con OTP)

- Al ingresar un correo electrónico, se debe llamar el endpoint para recibir un código OTP a su correo.
- El usuario debe ingresar el código para continuar con el inicio de sesión.
- Una vez validado el código mediante la API, se debe redirigir al usuario al **Dashboard**.

### Endpoints a utilizar:

- Solicitud de OTP:
  ```http
  POST https://api.octacore.do/api/otp
  Body: { "email": "TU-CORREO@gmail.com" }
  ```

- Validación de OTP:
  ```http
  POST https://api.octacore.do/api/otp/validation
  Body: { "email": "TU-CORREO@gmail.com", "otp": "1234" }
  ```

> ⚠️ **Importante:** Solo se deben utilizar las dos (2) APIs mencionadas arriba para el proceso de autenticación.

---

## 2. Dashboard (Protegido)

- El dashboard debe ser accesible únicamente si el usuario está autenticado.
- Si el usuario no ha iniciado sesión, no debe poder visualizarlo.

---

## 3. Dashboard

- El dashboard debe incluir una **KPI simple** utilizando datos relevantes del siguiente endpoint:

  ```
  GET https://api.octacore.do/api/recruitment/jobs
  ```

- Por ejemplo, mostrar un contador con el total de empleos:

  ```
  Total de Jobs: 3
  ```

- No es necesario mostrar muchos datos. Con un solo indicador que refleje el uso de la API es suficiente.

---

## 4. CRUD de Empleos

- Se debe implementar un CRUD completo (Crear, Leer, Actualizar, Eliminar) utilizando la siguiente API:

  ```
  https://api.octacore.do/api/recruitment/jobs
  ```

---

## Puntos a Evaluar

- ✅ Uso de **VueJS** (Obligatorio)  
- ✅ Uso de **TailwindCSS** (Obligatorio)  

## Puntos a Extras (No buscamos construir la rueda, estamos abierto al uso de herramientas que faciliten el desarrollo).

- ✅ Uso de **PrimeVUE** (Opcional, suma puntos extra)  
- ✅ Uso de **Pinia** u otro Store Management (Opcional, suma puntos extra)  
- ✅ Implementación de **Middleware o Interceptor** para autorización (Opcional, suma puntos extra)


---

## Nota

Recuerda utilizar **AI** para lograr un *clean code*, siempre y cuando la utilices adecuadamente y sabiendo lo que haces.  
Somos una empresa que apuesta al futuro de la **IA con responsabilidad**.
