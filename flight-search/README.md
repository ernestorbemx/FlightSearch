# Todo App

This application consumes the Amadeus REST API, allowing you to search for
flights given a set of parameters (departure, arrival, departue date, no. of adults, etc.). It is
a lightweight application that wraps functionality from Amadeus.

## Table of Contents

- [Caveats](#caveats)
- [Endpoints](#endpoints)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)

## Caveats
You need to configure the keys `amadeus.client-id` and `amadeus.client-secret`
on a .properties file (suggested: `secrets.properties` since is already git ignored), but can
be set on an env file.

## Endpoints

These are the endpoints implemented by the current version of the project.


## Features

- Search (arrival/departure airport, arrival/departure dates, no. of adults, include flights with stops or not)
- Search results: List of flights (summary)
- Search of airports given the name or IATA Code

## Prerequisites

There's no need for an specialized IDE for this project.
However, since the development was done using IntelliJ IDEA, using it
is super recommendable.

The needed software to run this project is:

- OpenJDK 17+
- Maven 3.9+


## Installation

Please be sure that you have the software requirements as [Prerequisites](#prerequisites) says.

Instructions to get your project up and running locally (UNIX-like systems):
1. Clone Repo
```bash
git clone https://github.com/ernestorbemx/FlightSearch.git
```
2. Change directory to the cloned project folder
```bash
cd FlightSearch/flight-search-react
```
3. Run maven script
```bash
./gradlew bootRun
```
4. Navigate to `http://localhost:8080/swagger-ui/index.html#/`
5. Done!

## Usage

This is a simple REST API. You can use your favourite
HTTP client to start using it.


## Testing

After following [this instructions](#installation), you can run the script:

```bash
    ./gradlew test
```

## Contributing
Contributions are welcome! For requesting changes, first open an issue.

When developing changes, please:
1. Fork the repo
2. Create your feature branch (git checkout -b feature/FeatureName)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/FeatureName)
5. Open a Pull Request




