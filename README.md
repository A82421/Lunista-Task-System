# 📝 Lunista Task System - Guía de Instalación

## 🚀 Instalación con Docker (La forma fácil)

```bash
docker-compose up --build
```

### 🔧 Requisitos previos
- Docker instalado (obvio)
- PostgreSQL instalado (solo para crear la DB inicial)
- Node 20.9.0 instalado
## 🛠 Configuración PASO A PASO

### 1️⃣ Crear la base de datos (SOLO PRIMERA VEZ)
```sql
CREATE DATABASE taskdb;
```

### 2️⃣ Crear la tabla tasks (SOLO PRIMERA VEZ)
```sql
\c taskdb  -- Nos conectamos a la DB

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    priority_level VARCHAR(10),
    status VARCHAR(15) NOT NULL,
    estimate NUMERIC CHECK (estimate >= 0),
    parent_task_id INTEGER REFERENCES tasks(id),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 3️⃣ Edit docker-compose.yml
```bash
Crea un .env archivo en el directorio principal:
DB_USER= tu_usuario
DB_PASSWORD= tu_contraseña_secretaaa  # Cambia esto!
DB_NAME= taskdb
DB_HOST=db
DB_PORT=5432
```

### 4️⃣ Levantar todo
```bash
docker-compose up --build
```

## 🌐 URLs de acceso
- **Frontend**: http://localhost:5173
- **Backend (API)**: http://localhost:3000

## 🆘 ¿Algo falla?
1. Verifica que la tabla esté creada EXACTA como arriba
2. Revisa los logs: `docker-compose logs`
3. Prueba reiniciar: `docker-compose down && docker-compose up --build`

## 💡 Tips útiles
- Usa `-d` para correr en segundo plano: `docker-compose up -d`
- Los datos persisten gracias a los volúmenes de Docker
- Si cambias la DB, reinicia los contenedores

---

# 📝 Lunista Task System - Installation Guide

## 🚀 Docker Installation (The easy way)

```bash
docker-compose up --build
```

### 🔧 Prerequisites
- Docker installed (duh)
- PostgreSQL installed (just for initial DB setup)
- Node installed
## 🛠 STEP-BY-STEP Configuration

### 1️⃣ Create database (FIRST TIME ONLY)
```sql
CREATE DATABASE taskdb;
```

### 2️⃣ Create tasks table (FIRST TIME ONLY)
```sql
\c taskdb  -- Connect to DB

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    priority_level VARCHAR(10),
    status VARCHAR(15) NOT NULL,
    estimate NUMERIC CHECK (estimate >= 0),
    parent_task_id INTEGER REFERENCES tasks(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3️⃣ Edit docker-compose.yml
Create .env file in main directory with:
DB_USER= your_user
DB_PASSWORD= secret_passworddd  # Change this!
DB_NAME= taskdb
DB_HOST=db
DB_PORT=5432
```

### 4️⃣ Start everything
```bash
docker-compose up --build
```

## 🌐 Access URLs
- **Frontend**: http://localhost:5173
- **Backend (API)**: http://localhost:3000

## 🆘 Troubleshooting
1. Verify table matches EXACTLY as above
2. Check logs: `docker-compose logs`
3. Try restarting: `docker-compose down && docker-compose up --build`

## 💡 Pro tips
- Use `-d` to run in background: `docker-compose up -d`
- Data persists thanks to Docker volumes
- If you change DB, restart containers

---

### 🎉 ¡Listo! / Done! 🎉
Con esto deberías tener todo funcionando. Si no, ¡avísame!
You should be all set. If not, let me know!