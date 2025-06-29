# 💳 Weft – Neobanco Digital

## 📌 Descripción del Proyecto

**Weft** es un neobanco completamente online que permite a los usuarios gestionar sus cuentas bancarias de forma sencilla y segura, sin necesidad de acudir a sucursales físicas. Diseñado para operar 100% telemáticamente, Weft facilita la administración de múltiples cuentas por usuario, con la opción de compartir cuentas con otros usuarios.

El usuario puede realizar todo tipo de transacciones bancarias: ingresos, retiros, transferencias y también externas. Estas operaciones se gestionan en tiempo real gracias a la integración de WebSockets, ofreciendo una experiencia ágil y moderna. Al crear un nuevo usuario, automáticamente se genera una cuenta y una tarjeta para que pueda empezar a operar desde el primer momento.

Weft incluye un completo datatable para visualizar las transferencias emitidas y recibidas, con opciones de búsqueda avanzada por múltiples parámetros para facilitar la consulta y el control financiero.

Además, la aplicación dispone de una sección de **criptomonedas**. Actualmente permite visualizar el precio en tiempo real de las principales cryptos, y en el futuro incluirá operaciones de compra, venta y transferencia.

En cuanto a seguridad, Weft incorpora mecanismos robustos como la **verificación de email**, **autenticación de dos factores (2FA)** mediante OTP en el inicio de sesión, y funcionalidades para recuperación o cambio de contraseña. Los usuarios también pueden actualizar sus datos personales en cualquier momento. La aplicación es **multilenguaje** (disponible en inglés y español) y cuenta con **modo oscuro**.

---

## ✨ Funcionalidades Principales

- ✅ Creación automática de cuenta y tarjeta al registrarse.
- 👥 Gestión de múltiples cuentas por usuario, incluyendo cuentas compartidas con cotitulares.
- 🔁 Transacciones bancarias en tiempo real: ingresos, retiros, transferencias internas y externas.
- 📊 Datatable con historial de transacciones emitidas y recibidas con filtros avanzados.
- 💹 Consulta en tiempo real del precio de criptomonedas.
- 🔐 Verificación de email y autenticación 2FA con OTP.
- 🔁 Recuperación y cambio de contraseña.
- 📝 Actualización de datos personales.
- 🌐 Soporte multilenguaje (inglés y español).
- 🌙 Modo oscuro para mejorar la experiencia visual.

---

## 🧩 Estructura de Datos

La base de datos está diseñada para reflejar de forma clara y escalable la relación entre usuarios, cuentas y operaciones. Las tablas principales son:

- **`users`**: Tabla principal. Almacena credenciales de acceso (email, contraseña, verificación, etc.).
- **`customers`**: Contiene la información personal del usuario, separada de sus credenciales.
- **`accounts`**: Define las cuentas bancarias, con información como saldo, tipo, estado, etc.
- **`account_customers`**: Tabla intermedia que permite relacionar múltiples clientes con una misma cuenta.
- **`cards`**: Tarjetas asociadas a las cuentas. Contiene datos como número, fecha de caducidad, etc.
- **`transactions`**: Historial de movimientos financieros, como ingresos, retiros y transferencias internas y externas.

![Diagrama de base de datos](Frontend/src/assets/img/Diagrama-BD.png)

---

## 🧱 Arquitectura del Proyecto

El proyecto sigue el patrón **Screaming Architecture**, lo que permite estructurar el código de manera que las funcionalidades de la app sean claras desde el inicio. Está enfocado en ser modular, mantenible y preparado para escalar.

La lógica de negocio se organiza en **servicios desacoplados**, lo que facilita su reutilización y hace que el sistema pueda crecer añadiendo nuevas funcionalidades sin comprometer la estabilidad del código.

---

## 🚀 Despliegue

La aplicación está desplegada con la siguiente configuración:

- El frontend (React) y el backend (Laravel) están servidos a través de un servidor **NGINX** que actúa como proxy interno, gestionando el enrutamiento de peticiones entre ambos.
- La base de datos MySQL está alojada en Amazon **RDS**, garantizando disponibilidad y escalabilidad.
- Por encima de esta capa, se encuentra **NGINX Proxy Manager** (NPM), que se encarga de gestionar los certificados SSL mediante Let's Encrypt y actúa como proxy inverso externo.
- La instancia **EC2** de AWS alberga todos los servicios

---

## 🛠️ Tecnologías Usadas

- **Frontend**: React + TailwindCSS  
- **Backend**: Laravel  
- **Realtime**: Laravel Reverb (WebSockets)  
- **Base de datos**: MySQL  
- **Servidor**: NGINX
- **Proxy inverso y SSL**: NGINX Proxy Manager (NPM)  
- **Infraestructura en la nube**: AWS (EC2 y RDS)

---

## 🔐 Credenciales de acceso para pruebas

Puedes usar los siguientes usuarios para probar la aplicación:

| 📧 Email             | 🔑 Contraseña |
|----------------------|---------------|
| carlos@carlos.es     | 11111111      |
| laura@laura.es       | 11111111      |

---

## 📫 Información de contacto

- 📨 Información: [zelhaouzyamrani@gmail.com](mailto:zelhaouzyamrani@gmail.com)  
- 🐙 GitHub: [https://github.com/ZuhirDev/Weft.git](https://github.com/ZuhirDev/Weft.git)  
- 🌐 Proyecto en línea: [https://weft.atisoluciones.es](https://weft.atisoluciones.es)

---

> ℹ️ *Este proyecto está desarrollado como parte de un Trabajo de Fin de Grado, con fines educativos y de demostración técnica.*
