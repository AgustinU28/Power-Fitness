# 💪 Power Fitness App

<div align="center">
  <img src="https://via.placeholder.com/300x150?text=Power+Fitness" alt="Power Fitness Logo" width="300"/>
  <br>
  <p><i>Tu compañero de entrenamiento personal en la palma de tu mano</i></p>
</div>

---

## 📱 Descripción

**Power Fitness** es una aplicación móvil completa desarrollada para gimnasios que revoluciona la manera en que los usuarios interactúan con su rutina de ejercicios. Con una interfaz intuitiva y funcionalidades avanzadas, permite a los usuarios:

- 🏋️‍♂️ Gestionar sus rutinas de entrenamiento
- 📊 Hacer seguimiento detallado de su progreso
- 🧘‍♀️ Inscribirse en clases grupales
- 🛒 Realizar compras de productos fitness

---

## 🚀 Tecnologías Utilizadas

<div align="center">

| Tecnología | Uso |
|------------|-----|
| <img src="https://via.placeholder.com/30?text=RN" style="vertical-align: middle;"> **React Native** | Framework para desarrollo móvil multiplataforma |
| <img src="https://via.placeholder.com/30?text=Expo" style="vertical-align: middle;"> **Expo** | Plataforma para simplificar el desarrollo React Native |
| <img src="https://via.placeholder.com/30?text=FB" style="vertical-align: middle;"> **Firebase** | Backend, autenticación y almacenamiento |

</div>

---

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- 📝 Registro de nuevos usuarios
- 🔑 Inicio de sesión seguro
- 🔄 Recuperación de contraseña

### 🏋️‍♀️ Sección de Rutinas
- 📋 Visualización de rutinas personalizadas
- ✅ Seguimiento de ejercicios en tiempo real
- 📝 Registro detallado de series y repeticiones

### 📈 Sección de Progreso
- 📊 Gráficos interactivos de avance
- 🗓️ Registro histórico de entrenamientos
- 📈 Estadísticas personalizadas y métricas

### 🧘 Sección de Clases
- 📅 Calendario dinámico de clases disponibles
- ✍️ Inscripción a clases con un solo toque
- 🔔 Notificaciones y recordatorios personalizables

### 🛍️ Tienda
- 🏷️ Catálogo interactivo de productos
- 🛒 Sistema avanzado de carrito de compras
  - ➕ Agregar productos
  - 🔄 Modificar cantidades
  - ❌ Eliminar productos
- 💳 Carrusel intuitivo de métodos de pago
- 🔒 Proceso de checkout seguro

---

## ⚙️ Instalación

### 📋 Requisitos Previos
- Node.js (v14.0.0 o superior)
- npm o yarn
- Expo CLI
- Cuenta en Firebase

### 📥 Pasos de Instalación

<details>
<summary><b>1. Clonar el repositorio</b></summary>

```bash
git clone https://github.com/tu-usuario/power-fitness.git
cd power-fitness
```
</details>

<details>
<summary><b>2. Instalar dependencias</b></summary>

```bash
npm install
# o
yarn install
```
</details>

<details>
<summary><b>3. Configurar Firebase</b></summary>

- Crea un proyecto en Firebase Console
- Agrega una aplicación web al proyecto
- Copia las credenciales de configuración
- Crea un archivo `.env` en la raíz del proyecto con tus credenciales:

```
API_KEY=tu-api-key
AUTH_DOMAIN=tu-auth-domain
DATABASE_URL=tu-database-url
PROJECT_ID=tu-project-id
STORAGE_BUCKET=tu-storage-bucket
MESSAGING_SENDER_ID=tu-messaging-sender-id
APP_ID=tu-app-id
```
</details>

<details>
<summary><b>4. Iniciar la aplicación</b></summary>

```bash
expo start
# o
npm start
```
</details>

---

## 📱 Uso

1. 📲 Abre la aplicación utilizando Expo Go en tu dispositivo o un emulador
2. 🔐 Regístrate o inicia sesión
3. 🧭 Navega por las diferentes secciones:
   - **🏋️ Rutina**: Visualiza y ejecuta tus rutinas asignadas
   - **📊 Progreso**: Revisa tu avance y métricas
   - **🧘 Clases**: Inscríbete en clases grupales
   - **🛒 Tienda**: Compra productos relacionados con fitness

---

## 📂 Estructura del Proyecto

```
power-fitness/
├── 🖼️ assets/              # Imágenes, fuentes y otros recursos
├── 🧩 components/          # Componentes reutilizables
│   ├── 🔐 auth/            # Componentes de autenticación
│   ├── 🏋️ routines/        # Componentes para la sección de rutinas
│   ├── 📊 progress/        # Componentes para la sección de progreso
│   ├── 🧘 classes/         # Componentes para la sección de clases
│   ├── 🛒 store/           # Componentes para la tienda
│   └── 🔄 shared/          # Componentes compartidos
├── 📱 screens/             # Pantallas principales
├── 🧭 navigation/          # Configuración de navegación
├── 🔌 services/            # Servicios de conexión con Firebase
├── 🌐 context/             # Context API para estado global
├── 🪝 hooks/               # Custom hooks
├── 🛠️ utils/               # Utilidades y funciones auxiliares
├── 📱 App.js               # Punto de entrada
├── ⚙️ app.json             # Configuración de Expo
└── 📦 package.json         # Dependencias
```

---

## 📸 Capturas de Pantalla

<div align="center">
  <img src="https://via.placeholder.com/150?text=Login" alt="Login Screen" width="150"/>
  <img src="https://via.placeholder.com/150?text=Rutinas" alt="Routines Screen" width="150"/>
  <img src="https://via.placeholder.com/150?text=Progreso" alt="Progress Screen" width="150"/>
  <img src="https://via.placeholder.com/150?text=Tienda" alt="Store Screen" width="150"/>
</div>

---

## 🤝 Contribución

Si deseas contribuir a este proyecto, por favor:

1. 🍴 Haz un fork del repositorio
2. 🌿 Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`)
3. 💾 Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva característica'`)
4. 📤 Sube tus cambios (`git push origin feature/nueva-caracteristica`)
5. 📩 Abre un Pull Request

---

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

<div align="center">
  <a href="mailto:contacto@powerfitness.com">
    <img src="https://via.placeholder.com/30?text=📧" alt="Email"/>
  </a>
  <a href="https://twitter.com/powerfitness">
    <img src="https://via.placeholder.com/30?text=🐦" alt="Twitter"/>
  </a>
  <a href="https://instagram.com/powerfitness">
    <img src="https://via.placeholder.com/30?text=📸" alt="Instagram"/>
  </a>
</div>

---

<div align="center">
  <p>Desarrollado con ❤️ para Power Fitness</p>
  <p>© 2025 Power Fitness. Todos los derechos reservados</p>
</div>
