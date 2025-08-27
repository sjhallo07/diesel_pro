# Diesel Pro - Catálogo y Carrito de Compras

Aplicación web desarrollada en React + Vite para la gestión de un catálogo de repuestos diésel, con carrito de compras, filtros, importación de inventario desde Excel y diseño responsivo.

## Características

- Catálogo de productos con filtros por tipo.
- Carrito de compras global (Redux Toolkit).
- Importación de productos desde archivos Excel (`.xlsx`).
- Checkout con ventana emergente (modal) para futuras integraciones de pago.
- Diseño moderno y responsivo.
- Íconos FontAwesome integrados.

## Instalación

1. Clona el repositorio y entra al directorio del proyecto:
   ```sh
   git clone <URL_DEL_REPO>
   cd learning_react
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

4. Abre la aplicación en tu navegador:
   ```sh
   $BROWSER http://localhost:5173
   ```

## Uso

- **Agregar productos al carrito:** Haz clic en "Agregar" en cualquier producto.
- **Filtrar productos:** Usa los botones de filtro por tipo.
- **Importar inventario:** Haz clic en "Importar Inventario (Excel)" y selecciona un archivo `.xlsx` con las columnas: `name`, `type`, `price`, `stock`, `img` (opcional).
- **Ver y gestionar el carrito:** Haz clic en el ícono de carrito en el header.
- **Checkout:** Haz clic en "Checkout" para abrir el modal (funcionalidad futura).

## Estructura del Proyecto

```
learning_react/
  public/
  src/
    assets/
    components/
    store/
    App.css
    App.jsx
    index.css
    main.jsx
  package.json
  vite.config.js
  ...
```

## Dependencias principales

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Vite](https://vitejs.dev/)
- [XLSX](https://github.com/SheetJS/sheetjs)
- [FontAwesome Free](https://fontawesome.com/)

## Licencia

MIT

---

Desarrollado por [Tu Nombre o Equipo].