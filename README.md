
# Taller patrones arquitecturales

En este taller se desarrolló un sistema CRUD para la gestión de propiedades inmobiliarias, implementando una aplicación web con un frontend en HTML y JavaScript que permite crear, visualizar, actualizar y eliminar propiedades. Se utilizó Fetch API para la comunicación con un backend en Spring Boot, donde se diseño una API RESTful con endpoints para gestionar la información almacenada en una base de datos MySQL mediante JPA/Hibernate. Cada propiedad cuenta con un ID generado automáticamente, dirección, precio, tamaño y descripción. Además, desplegué el backend y la base de datos en servidores independientes en AWS, asegurando la correcta integración y funcionamiento del sistema.

## Tabla de Contenido

1. [Instalación](#instalación)  
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)  
   - [Estructura del Directorio](#estructura-del-directorio)  
   - [Capas del Proyecto](#capas-del-proyecto)  
   - [Diseño de Clases](#diseño-de-clases)  
   - [Diagrama del Proyecto](#diagrama-del-proyecto)  
3. [Docker Despliegue Local](#docker-despliegue-local-imagen)  
4. [Docker y AWS](#docker-y-aws)  
   - [Subida de la Imagen a Docker Hub](#subida-de-la-imagen-a-docker-hub)  
   - [Configuración en AWS](#configuración-en-aws)  
5. [Pruebas Automatizadas](#pruebas-automatizadas)  
6. [Autor](#autor)   

  
## Instalación

**1.**  Clonar el repositorio

```bash
  git clone https://github.com/LaaSofiaa/AREP-Taller-05.git

  cd AREP-Taller-05
```
**2.**  Construir el proyecto mediante maven, donde debes tener previamente instalado este https://maven.apache.org . Luego pruebe el siguiente comando para compilar, empaquetar y ejecutar. 
```bash
  mvn clean install
  mvn package
```  
**3.**  Ejecuta el proyecto con el siguiente comando:
```bash
  java -jar target/tallerjpa-0.0.1-SNAPSHOT.jar

```

**4.**  Una vez este corriendo la aplicación prueba los siguiente:

* **Página Principal:**
```bash
  http://localhost:8080/
```


## Arquitectura del Proyecto 
### **Estructura del directorio**

El directorio del proyecto esta organizado de la siguiente manera:

```plaintext
src/
├── main/
│   ├── java/
│   │   └── com.edu.arep.tallerjpa/
│   │       ├── Controller/
│   │       │   └── PropertyController.java
│   │       ├── Entity/
│   │       │   └── Property.java
│   │       ├── Repository/
│   │       │   └── PropertyRepository.java
│   │       ├── Service/
│   │       │   └── PropertyService.java
│   │       └── AccessingDataJpaApplication.java
│   ├── resources/
│   │   ├── static/
│   │   │   ├── index.html
│   │   │   ├── script.js
│   │   │   └── styles.css
│   │   ├── templates/
│   │   └── application.properties
└── test/
    ├── java/
    │   └── com.edu.arep.tallerjpa/
    │       └── PropertyTest.java
```

### **Capas del Proyecto**

 El sistema se compone de tres capas principales:  

- **Frontend (HTML, CSS, JavaScript)**: Proporciona una interfaz gráfica con formularios para ingresar y visualizar propiedades. Usa `fetch` para comunicarse con la API REST.  
- **Backend (Spring Boot, Java, JPA/Hibernate)**: Expone una API RESTful con endpoints para gestionar las propiedades. Maneja la validación de datos y la lógica del negocio.  
- **Base de datos (MySQL)**: Almacena la información de las propiedades en una tabla estructurada y permite la persistencia de datos.  

El backend y la base de datos están diseñados para ser desplegados en servidores separados en AWS.


###  **Diseño de Clases**

El sistema sigue el patrón MVC (Modelo-Vista-Controlador), y sus principales clases son:  

- **Entidad (`Property.java`)**: Representa una propiedad con atributos como `id`, `address`, `price`, `size` y `description`.  
- **Repositorio (`PropertyRepository.java`)**: Interactúa con la base de datos mediante JPA.  
- **Servicio (`PropertyService.java`)**: Implementa la lógica de negocio y operaciones sobre las propiedades.  
- **Controlador (`PropertyController.java`)**: Expone los endpoints REST para la gestión de propiedades.  

    
### Diagrama del proyecto

![image](https://github.com/user-attachments/assets/5343a1b2-697b-4112-876b-a21f780d8cd5)


## Docker despliegue local imagen

  1. En la raíz del proyecto, crea un archivo llamado `Dockerfile` y sigue los comandos del video

     [Ver video de demostración](https://youtu.be/Pc8NO31_jHQ)
     
https://github.com/user-attachments/assets/c31edfb6-fc07-4244-ade8-20f4b941dc34


## Docker y AWS

### Subida de la Imagen a Docker Hub  
Para facilitar el despliegue, se creó una imagen Docker del backend y se subió a Docker Hub. El proceso fue el siguiente:  

1. Construcción de la imagen Docker:
   
```bash
  docker build -t usuario/docker-repo:latest .
```

2. Inicio de sesión en Docker Hub:

```bash
  docker login
```
3. Subida de la imagen al repositorio
   
```bash
  docker push usuario/docker-repo:latest
```

### Configuración en AWS
Después de subir la imagen, se creó una instancia en AWS EC2 para ejecutarla.

1. **Creación de la instancia**

[Ver video de demostración](https://youtu.be/26UW_WXy4Yc)

https://github.com/user-attachments/assets/158e8f24-0ff5-4901-b8f8-3bd8e0203a28

2. **Instalación de Docker en la instancia**

```bash
  sudo yum update -y
  sudo yum install docker
  sudo service docker start
  sudo usermod -a -G docker ec2-user
  docker run --name mysql-properties \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=properties \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=secret \
  -p 3306:3306 \
  -d mysql:latest
```
3. **Descarga y ejecución de la imagen desde DockerHub**

```bash
  docker pull usuario/docker-repo:latest
  docker run -d -p 8080:8080 usuario/docker-repo:latest
```

3. **Verificación del despliegue**
   Se verifica que el contenedor estuviera corriendo con:

```bash
  docker ps
```

  Finalmente, se accedió a la aplicación desde el navegador usando la dirección pública de la instancia:
  
```bash
  http://<IP-PUBLICA-AWS>:8080
```

[Ver video de demostración](https://youtu.be/UUwNUy3D2PU)

https://github.com/user-attachments/assets/73afbb42-549d-411c-aaa8-a566ffa1b66f



## Pruebas Automatizadas

Las pruebas realizadas en el sistema de gestión de propiedades incluyen los siguientes casos, implementados con JUnit y Mockito para validar la funcionalidad del controlador y servicio:

**getAllProperties:** Se verifica que el sistema pueda recuperar correctamente una lista de propiedades. Se simula una respuesta del servicio y se comprueba que el tamaño de la lista obtenida es el esperado.

**getPropertyById:** Se prueba la obtención de una propiedad por su ID, asegurando que el sistema devuelva la propiedad correcta y que la respuesta HTTP sea exitosa.

**createProperty:** Se valida que una nueva propiedad pueda ser creada correctamente. Se compara la información devuelta por el controlador con la propiedad ingresada.

**updateProperty:** Se comprueba que una propiedad existente pueda ser modificada y que la actualización refleje los cambios esperados en la base de datos.

**deleteProperty:** Se prueba que una propiedad pueda ser eliminada correctamente, asegurando que la operación sea ejecutada sin errores.

Cada prueba incluye validaciones de estado HTTP y verificaciones con Mockito para asegurar que los métodos del servicio sean invocados correctamente.

---
Para correr las pruebas usamos el siguiente comando

```bash
  mvn test

```
![image](https://github.com/user-attachments/assets/58947a21-c665-4f3c-a134-af3635427302)
![image](https://github.com/user-attachments/assets/95e4764e-d0a7-4b2f-9fcb-1d7abd6fc916)

## Autor

**Laura Gil** - Desarrolladora y autora del proyecto. 





