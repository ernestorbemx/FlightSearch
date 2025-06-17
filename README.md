# Flight Search

This project leverages Amadeus REST API into a fully usable web application
for searching flight offers given a set of parameters. It is composed of two
projects, a [Spring Boot application](/flight-search/) as a lightweight wrapper on Amadeus API and a [frontend application](/flight-search-react/) built with React

## Running both apps using Docker

If you plan to run this application with the minimum setup required you must:

### Prerequisites

1. Download and install [Docker Desktop/Engine](https://docs.docker.com/) in your computer
2. Create an account on [Amadeus](https://developers.amadeus.com/) and generate a new application (Client Secret And Client Id)
3. Create a `compose.env` file in the same directory as this README file
   and set `amadeus.client-id` and `amadeus.client-secret` to the correspondint values of step 2.

### Steps

1. Build Spring Boot project:
   `cd flight-search && ./gradlew bootJar`
2. Build the needed docker images
   `cd .. && docker compose build`
3. Run the docker compose services
   `docker compose run`
4. If everything sucessful, you should see the running application on `http://localhost:3000` (Backend running on `http://localhost:8080`)

## Contributing

Contributions are welcome! Please open an issue or pull request if you'd like to help.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/FeatureName`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/FeatureName`
5. Open a pull request
