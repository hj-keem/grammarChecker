# Use the official OpenJDK image from the Docker Hub
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY hangulsarang-0.0.1-SNAPSHOT.jar /app/hangulsarang.jar

# Expose the port your application runs on
EXPOSE 8080

# Define the command to run your application
CMD ["java", "-jar", "/app/hangulsarang.jar"]

