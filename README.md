
# Trackify

Trackify is a web application designed to streamline task management and enhance productivity in the workplace. It provides a user-friendly interface for employers to keep track of their employees' daily work activities and empowers employees to log their tasks efficiently.
#### Web Link: https://trackify.duckdns.org
| Admin Credentials | Employee Credentials |
|-----------------------------------------|-----------------------------------------|
| Email: testadmin@gmail.com |  Email: testemployee@gmail.com |
| Password- 123@testadmin | Password- 123@Testemployee |
  
|  Login                              |                                 |
|-----------------------------------------|-----------------------------------------|
| ![Image 1](https://github.com/rishavchanda/Trackify/assets/64485885/b8aae2e1-cb85-4d37-93f8-ca95e8141367) | ![Image 2](https://github.com/rishavchanda/Trackify/assets/64485885/eded583f-0e0e-45a2-9f41-017c3d7cb74f) |

| Admin                                | Employee                                 |
|-----------------------------------------|-----------------------------------------|
| ![Image 3](https://github.com/rishavchanda/Trackify/assets/64485885/e1f89b04-2788-45b0-abc2-9dec616669e2) | ![Image 10](https://github.com/rishavchanda/Trackify/assets/64485885/c0abba0e-84d3-4299-9325-56c40d4b027b) |
| ![Image 4](https://github.com/rishavchanda/Trackify/assets/64485885/27fce475-a52f-4f1f-91f4-228a5a4b08ab) | ![Image 11](https://github.com/rishavchanda/Trackify/assets/64485885/df1d5cf4-b623-4c78-9fe4-4744ca271320) |
| ![Image 5](https://github.com/rishavchanda/Trackify/assets/64485885/39f9083d-61cb-462d-ba85-040679f598b3) | ![Image 12](https://github.com/rishavchanda/Trackify/assets/64485885/2b308d4e-c9a2-4384-9eee-0d1c45236ba5) |
| ![Image 6](https://github.com/rishavchanda/Trackify/assets/64485885/80df62ef-02f0-4edc-8019-666a29a26a7c) | ![Image 13](https://github.com/rishavchanda/Trackify/assets/64485885/4ec48929-8ad4-499b-b337-0b5cd68aadf8) |
| ![Image 7](https://github.com/rishavchanda/Trackify/assets/64485885/d9dd8674-6bc0-4e8a-a9fd-46fb721a4e62) | ![Image 14](https://github.com/rishavchanda/Trackify/assets/64485885/343b8f3d-7fce-4bb7-8190-799a406dc460) |
| ![Image 8](https://github.com/rishavchanda/Trackify/assets/64485885/c951188e-20d4-4ce8-98ce-8c11f4dd507e) | ![Image 15](https://github.com/rishavchanda/Trackify/assets/64485885/73e4747d-f5bc-49f7-95dc-272837910da2) |
| ![Image 9](https://github.com/rishavchanda/Trackify/assets/64485885/abcf8e67-27ac-4691-a856-b76b3ae3e9db) |                                         |



## Features

- User Authentication:

  - Admin Login: Admins can access the system using their unique username and password to manage employee data and tasks.

  - Employee Login: Employees can log in with their credentials to add and view their tasks.

- Employee Management:

  - Admin Dashboard: The admin has the ability to add employees, deactivate accounts, and view a list of all employees.
  - Employee Profile Update: Employees can update their profile information and password, except for the email ID.

- Task Management:
  - Add Tasks: Employees can log tasks for each day, including task description, type (break, meeting, or work), start time, and duration.
  - Date Filtering: Users can filter and view tasks and associated graphical information for specific dates.
- Graphical Information:
  - Pie Charts: Two pie charts display task distribution for the current day and the previous day, categorized by break, meeting, and work.
  - Stacked Bar Chart: A stacked bar chart provides a weekly overview, showing the distribution of not working (including breaks), working (work tasks), and meetings.

## Getting Started

### Pre-requisites

1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).
2. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and set up a cluster.

### Clone the repository

1. Clone the repository: `git clone https://github.com/rishavchanda/Trackify.git`

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

- Front-End: ReactJS, HTML, CSS, JavaScript
- Back-End: Node.js, Express.js
- Database: MongoDB

## Contributing

We welcome contributions from the community to enhance Trackify. Feel free to submit bug reports, feature requests, or pull requests through the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or inquiries, please reach out to the development team at [rishavchanda0@gmail.com]

Enjoy using Trackify and stay productive!
