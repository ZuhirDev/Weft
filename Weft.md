# Documentación del Proyecto: Neobanco

## Resumen del Proyecto

El objetivo de este proyecto es crear un neobanco que permita a los usuarios gestionar sus cuentas bancarias, realizar transferencias y obtener tarjetas de pago, todo de forma digital, sin necesidad de sucursales físicas. El sistema incluirá funciones básicas de un banco tradicional, como transferencias, gestión de cuentas y tarjetas, además de permitir que los empleados administren el sistema mediante un panel de administración con permisos y roles definidos.

El sistema estará dividido en dos partes principales: **clientes** y **empleados**.

### Clientes
Los usuarios podrán realizar funciones básicas, tales como:
- Transferencias entre cuentas.
- Consultar su saldo y el historial de transacciones.
- Gestionar tarjetas y cuentas.
- Activar/desactivar tarjetas y establecer límites de gasto.

### Empleados
Tendrán un panel de administración que les permitirá gestionar:
- Clientes y sus cuentas.
- Ver las transacciones realizadas.
- Generar informes y realizar operaciones dependiendo de sus roles y permisos.

---

## Modelo de Datos

### Tabla `accounts`
**Descripción:** Almacena la información relacionada con las cuentas bancarias de los clientes.

**Campos principales:**
- `customer_id`: Relacionado con el cliente que posee la cuenta.
- `IBAN`: Identificador único de la cuenta bancaria.
- `balance`: Saldo disponible en la cuenta.
- `swift`: Código SWIFT de la cuenta.
- `status`: Estado de la cuenta (ej. activa, bloqueada, cerrada).
- `timestamps`: Fechas de creación y modificación.
- `softDeletes`: Permite eliminar la cuenta de forma lógica, sin eliminarla completamente.

---

### Tabla `transactions`
**Descripción:** Registra todas las transacciones realizadas en el sistema.

**Campos principales:**
- `origin_account_id`: Cuenta de origen de la transferencia.
- `destination_account_id`: Cuenta de destino de la transferencia (puede ser externa).
- `destination_iban`: IBAN de la cuenta de destino si es externa.
- `amount`: Monto de la transferencia.
- `type`: Tipo de transacción (ej. transferencia, depósito, retiro, tarifa).
- `status`: Estado de la transacción (ej. pendiente, completada, fallida).
- `currency`: Moneda en la que se realiza la transferencia (por defecto: USD).
- `concept`: Concepto o descripción de la transferencia.
- `transaction_reference`: Referencia única de la transacción.
- `processed_at`: Fecha en que la transacción fue procesada.

---

### Tabla `users`
**Descripción:** Almacena la información de los usuarios del sistema, tanto clientes como empleados.

**Campos principales:**
- `name`: Nombre completo del usuario.
- `email`: Dirección de correo electrónico.
- `password`: Contraseña cifrada del usuario.
- `role_id`: Rol asignado al usuario (relacionado con la tabla roles).
- `status`: Estado del usuario (activo, bloqueado).
- `timestamps`: Fechas de creación y actualización.

---

### Tabla `employees`
**Descripción:** Almacena la información de los empleados y sus permisos.

**Campos principales:**
- `name`: Nombre completo del empleado.
- `role_id`: Relacionado con el rol del empleado (administrador, soporte, etc.).
- `status`: Estado del empleado (activo, inactivo).
- `timestamps`: Fechas de creación y modificación.