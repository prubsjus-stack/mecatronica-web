# Ingeniería Mecatrónica - Página Web

Página web estática e informativa sobre ingeniería mecatrónica. Responsiva y lista para publicarse gratuitamente en **GitHub Pages** para que esté disponible desde cualquier dispositivo (móvil, tablet, PC) sin necesidad de que tu PC esté encendida.

## Estructura

```
mecatronica-web/
├── index.html      # Página principal
├── css/style.css   # Estilos
├── js/main.js      # Interactividad (menú móvil, formulario)
└── img/            # (opcional) imágenes / fotos de proyectos
```

## Publicar en GitHub Pages (gratis)

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. En GitHub, haz clic en **New repository** (Nuevo repositorio):
   - Dale un nombre, p. ej. `mecatronica-web`.
   - Selecciona **Public** (público).
   - No marques "Initialize with README" (ya lo tienes).
3. Sube los archivos de la carpeta `mecatronica-web` a tu repositorio (con Git o la interfaz web).
4. Ve a **Settings** → **Pages** (o "GitHub Pages" en el menú de la izquierda).
5. En **Source**, selecciona `main` (rama principal) y carpeta `/root`, pulsa **Save**.
6. Espera 1-2 minutos. GitHub te dará una dirección como:
   `https://TU-USUARIO.github.io/mecatronica-web/`

Esa URL funciona desde cualquier dispositivo con internet, sin tu PC.

## Probar en local (opcional)

Abre `index.html` con doble clic en tu navegador, o ejecuta:

```
python -m http.server 8000
```

y visita `http://localhost:8000`.
