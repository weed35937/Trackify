# Taskify

Taskify is a web application designed to streamline task management and enhance productivity in the workplace. It provides a user-friendly interface for employers to keep track of their employees' daily work activities and empowers employees to log their tasks efficiently.

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

### Start the client
1. Clone the repository: `git clone https://github.com/rishavchanda/taskify.git`
2. Navigate to client folder: `cd client`
3. Install the necessary dependencies: `npm install`
4. Set up the database and configure the environment variables.
5. Run the application: `npm start`
6. Access the application through your web browser at `http://localhost:3000`
7. To stop the application, press `Ctrl + C`

### Start the server
1. Navigate to server folder: `cd server`
2. Install the necessary dependencies: `npm install`
3. Set up the database and configure the environment variables.
4. Run the application: `npm start`
5. To stop the application, press `Ctrl + C`

### Set up the database
1. Create a MongoDB Atlas account and set up a cluster.
2. Create a `.env` file in the server folder and add the following environment variables:
```
MONGO_URL = <MongoDB connection string>
```
3. Create a `.env` file in the client folder and add the following environment variables:
```
REACT_APP_API_URL = http://localhost:5000/api
```

## Technologies Used

- Front-End: HTML, CSS, JavaScript
- Back-End: Node.js, Express.js
- Database: MongoDB
- Charting Library: Chart.js

## Contributing

We welcome contributions from the community to enhance Taskify. Feel free to submit bug reports, feature requests, or pull requests through the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

For any questions or inquiries, please reach out to the development team at [email protected]

Enjoy using Taskify and stay productive!
