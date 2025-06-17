# the base image
FROM amazoncorretto:17-alpine

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# the JAR file path (default gradlde)
ARG JAR_FILE=build/libs/*.jar

# Copy the JAR file from the build context into the Docker image
COPY ${JAR_FILE} application.jar

EXPOSE 8080
# Set the default command to run the Java application
ENTRYPOINT ["java", "-Xmx2048M", "-jar", "/application.jar"]