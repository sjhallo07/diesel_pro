// organize-files.js
const fs = require("fs");
const path = require("path");

const base = path.join(__dirname, "src");
const assets = path.join(base, "assets");
const store = path.join(base, "store");

// 1. Eliminar archivos genéricos
["Untitled-1.js", "Untitled-1.txt"].forEach(file => {
  const filePath = path.join(assets, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Eliminado: ${filePath}`);
  }
});

// 2. Mover products.js de assets a store si existe
const productsInAssets = path.join(assets, "products.js");
const productsInStore = path.join(store, "products.js");

if (fs.existsSync(productsInAssets)) {
  if (!fs.existsSync(productsInStore)) {
    fs.renameSync(productsInAssets, productsInStore);
    console.log(`Movido: ${productsInAssets} -> ${productsInStore}`);
  } else {
    fs.unlinkSync(productsInAssets);
    console.log(`Eliminado duplicado: ${productsInAssets}`);
  }
}

// 3. Mover imágenes de cualquier subcarpeta de src a assets
function moveImages(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (fullPath !== assets) moveImages(fullPath);
    } else if (/\.(png|jpg|jpeg|svg|webp)$/i.test(file)) {
      const dest = path.join(assets, file);
      if (!fs.existsSync(dest)) {
        fs.renameSync(fullPath, dest);
        console.log(`Imagen movida: ${fullPath} -> ${dest}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`Imagen duplicada eliminada: ${fullPath}`);
      }
    }
  });
}
moveImages(base);

// 4. Eliminar archivos basura (.DS_Store, Thumbs.db)
function deleteJunkFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      deleteJunkFiles(fullPath);
    } else if ([".DS_Store", "Thumbs.db"].includes(file)) {
      fs.unlinkSync(fullPath);
      console.log(`Eliminado archivo basura: ${fullPath}`);
    }
  });
}
deleteJunkFiles(base);

// 5. Eliminar archivos vacíos en assets
fs.readdirSync(assets).forEach(file => {
  const filePath = path.join(assets, file);
  if (fs.statSync(filePath).isFile() && fs.readFileSync(filePath).length === 0) {
    fs.unlinkSync(filePath);
    console.log(`Eliminado archivo vacío: ${filePath}`);
  }
});

// 6. Mover CSS genéricos de components a assets
function moveCSS(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      moveCSS(fullPath);
    } else if (/\.css$/i.test(file) && dir !== assets) {
      const dest = path.join(assets, file);
      if (!fs.existsSync(dest)) {
        fs.renameSync(fullPath, dest);
        console.log(`CSS movido: ${fullPath} -> ${dest}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`CSS duplicado eliminado: ${fullPath}`);
      }
    }
  });
}
moveCSS(path.join(base, "components"));

// 7. Eliminar archivos de pruebas (*.test.js, *.spec.js)
function deleteTestFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      deleteTestFiles(fullPath);
    } else if (/\.(test|spec)\.js$/i.test(file)) {
      fs.unlinkSync(fullPath);
      console.log(`Eliminado archivo de prueba: ${fullPath}`);
    }
  });
}
deleteTestFiles(base);

// 8. Eliminar archivos temporales (*~, *.swp, *.tmp)
function deleteTempFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      deleteTempFiles(fullPath);
    } else if (/(\~|\.swp|\.tmp)$/i.test(file)) {
      fs.unlinkSync(fullPath);
      console.log(`Eliminado archivo temporal: ${fullPath}`);
    }
  });
}
deleteTempFiles(base);

// 9. Eliminar README vacíos en subcarpetas de src
function deleteEmptyReadmes(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      deleteEmptyReadmes(fullPath);
    } else if (/^README\.md$/i.test(file) && fs.readFileSync(fullPath).length === 0) {
      fs.unlinkSync(fullPath);
      console.log(`Eliminado README vacío: ${fullPath}`);
    }
  });
}
deleteEmptyReadmes(base);

console.log("Organización y limpieza avanzadas completadas.");