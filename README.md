# Taskify

Taskify is a web application designed to streamline task management and enhance productivity in the workplace. It provides a user-friendly interface for employers to keep track of their employees' daily work activities and empowers employees to log their tasks efficiently.

## Features

-   User Authentication:

    -   Admin Login: Admins can access the system using their unique username and password to manage employee data and tasks.
    -   Employee Login: Employees can log in with their credentials to add and view their tasks.

-   Employee Management:

    -   Admin Dashboard: The admin has the ability to add employees, deactivate accounts, and view a list of all employees.
    -   Employee Profile Update: Employees can update their profile information and password, except for the email ID.

-   Task Management:
    -   Add Tasks: Employees can log tasks for each day, including task description, type (break, meeting, or work), start time, and duration.
    -   Date Filtering: Users can filter and view tasks and associated graphical information for specific dates.
-   Graphical Information:
    -   Pie Charts: Two pie charts display task distribution for the current day and the previous day, categorized by break, meeting, and work.
    -   Stacked Bar Chart: A stacked bar chart provides a weekly overview, showing the distribution of not working (including breaks), working (work tasks), and meetings.

## Getting Started

### Pre-requisites
1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
2. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and set up a cluster.

### Clone the repository
1. Clone the repository: `git clone https://github.com/rishavchanda/taskify.git`

### Configure the client

1. Navigate to client folder: `cd client`
2. Build the docker image for the client in dev mode: `docker build -f Dockerfile.dev -t trackify-react-image .`
3. Set up and configure the environment variables, create a `.env` file in the client folder and add the following environment variables:

```
REACT_APP_API_URL = http://localhost:8800/api
```

### Configure the server

1. Navigate to server folder: `cd server`
2. Build the docker image for the server in dev mode: `docker build -f Dockerfile.dev -t trackify-server-image .`
3. Set up the database and configure the environment variables by following the instructions in the next steps.

### Set up the database

1. Create a MongoDB Atlas account and set up a cluster.
2. Create a `.env` file in the server folder and add the following environment variables:

```
MONGO_URL = <MongoDB connection string>
```

### Run the application

1. Navigate to the root folder: `cd ..`
2. Run the docker-compose file: `docker-compose -f docker-compose.yml -f docker-compose-dev.yml  up --build`
3. Open the application in your browser at `http://localhost:3000`
4. Server will be running at `http://localhost:8800`
5. To stop the application, press `Ctrl + C` in the terminal.

## Technologies Used

-   Front-End: ReactJS, HTML, CSS, JavaScript
-   Back-End: Node.js, Express.js
-   Database: MongoDB


## Contributing

We welcome contributions from the community to enhance Taskify. Feel free to submit bug reports, feature requests, or pull requests through the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or inquiries, please reach out to the development team at [rishavchanda0@gmail.com]

Enjoy using Taskify and stay productive!
