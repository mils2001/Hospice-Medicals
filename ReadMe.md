#Hospice App

Hospice App is a web-based platform designed to streamline patient-doctor communication and help patients manage their healthcare needs. With features such as messaging, prescription tracking, and appointment reminders, the app aims to enhance the patient experience by offering a simple and intuitive interface.
Table of Contents

    Demo
    Features
    Technologies Used
    Setup
    API Endpoints
    Usage
    Contributing
    License

Demo


Click the link above for a demo of the app in action.
Features

    Patient Communication: Send and receive messages between patients and doctors.
    Appointment Management: Schedule, view, and manage patient appointments.
    Prescription Tracking: Keep records of prescribed medications.
    Reminders: Patients receive alerts for upcoming appointments and medication times.
    User-friendly Interface: Designed with simplicity and ease of use in mind.

Technologies Used

    Frontend: HTML, Tailwind CSS, JavaScript
    Backend: JSON-Server for mock backend
    Database: JSON file to simulate data storage

Setup

    Clone the repository:

    bash

git clone <repository-url>

Navigate into the project directory:

bash

cd hospital-app

Install dependencies (if needed):

bash

npm install json-server

Start the backend:

bash

    json-server --watch db.json

    Open the index.html file in your browser to access the frontend.

API Endpoints

    GET /patients: Retrieves all patient information.
    POST /appointments: Creates a new appointment.
    PATCH /prescriptions/:id: Updates a specific prescription record.
    DELETE /appointments/:id: Deletes an appointment.

Usage

    Home Page: Displays quick links to appointments, messages, and reminders.
    Messages: Patients can communicate with their assigned doctors.
    Appointments: Users can schedule and view upcoming doctor visits.
    Prescriptions: Track prescribed medications and dosage instructions.
    Reminders: Set alerts to notify users about upcoming events and medications.

Contributing

We welcome contributions! Follow these steps to contribute:

    Fork the repository.
    Create a new branch:

    bash

git checkout -b feature-branch

Make your changes and commit:

bash

git commit -m "Added new feature"

Push to your branch:

bash

    git push origin feature-branch

    Create a pull request on the main repository.

License

This project is licensed under the MIT License. See the LICENSE file for more information.
Contact

For any inquiries or issues, please reach out to the project maintainer at [Milechris466@gmail.com].