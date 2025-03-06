FROM openjdk:21

WORKDIR /usrapp/bin

ENV PORT=8080
ENV DOCKER_ENV=true

COPY target/classes /usrapp/bin/classes
COPY target/dependency /usrapp/bin/dependency

CMD ["java", "-cp", "./classes:./dependency/*", "com.edu.arep.tallerjpa.AccessingDataJpaApplication"]