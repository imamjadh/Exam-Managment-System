# Exam Management System

A responsive web-based **Exam Management System** designed to simplify and manage university examination-related activities for **students and administrators**.

The system provides separate dashboards for students and administrators, allowing students to submit examination-related requests and access important exam information, while administrators can manage student records, requests, announcements, and examination results.

---

## Project Overview

The Exam Management System provides a centralized platform for handling common university examination activities.

### Student Portal

Students can:

- Log in to the system
- Access their dashboard
- Submit examination requests
- Upload medical certificates
- View examination information
- View announcements
- Access examination results
- Manage their student information

### Administrator Portal

Administrators can:

- Log in to the administration system
- Access the admin dashboard
- Manage student records
- Review examination requests
- Approve or decline requests
- Manage announcements
- Publish examination information
- Manage examination results
- View submitted medical certificates

---

## Features

### Student Features

| Feature | Description |
|---|---|
| 🔐 Student Login | Secure interface for student access |
| 📊 Student Dashboard | Centralized student interface |
| 📝 Exam Requests | Submit examination-related requests |
| 📄 Medical Certificates | Upload supporting medical documents |
| 📢 Announcements | View important university announcements |
| 📚 Exam Information | Access examination-related information |
| 🏆 Results | View examination results |
| 👤 Student Information | Manage student details |

### Administrator Features

| Feature | Description |
|---|---|
| 🔐 Admin Login | Administrator authentication interface |
| 📊 Admin Dashboard | Centralized management interface |
| 👨‍🎓 Student Management | Manage student records |
| 📝 Request Management | Review examination requests |
| ✅ Request Approval | Approve or decline requests |
| 📢 Announcement Management | Create and manage announcements |
| 📚 Exam Information | Publish examination information |
| 🏆 Result Management | Manage examination results |
| 📄 Medical Certificates | View submitted certificates |

---

## Technologies Used

- **HTML5** — Structure and content
- **CSS3** — Styling and responsive design
- **JavaScript** — Application functionality and interactions

---

## Project Structure

```text
Exam Management System/
│
├── aboutus.html
├── admindashboard.html
├── adminfunctions.js
├── contectus.html
├── firtspage.html
├── signin.html
├── studentdashboard.html
├── studentdashboard.js
├── style.css
│
├── PHOTOS/
│   ├── ati.jpg
│   ├── image.jpg
│   ├── LOGO.png
│   ├── person-circle.svg
│   └── sliate.jpg
│
└── README.md
```

---

## File Descriptions

| File / Folder | Description |
|---|---|
| `firtspage.html` | Main landing page |
| `signin.html` | User login page |
| `studentdashboard.html` | Student dashboard interface |
| `studentdashboard.js` | Student dashboard functionality |
| `admindashboard.html` | Administrator dashboard |
| `adminfunctions.js` | Administrator-related functionality |
| `aboutus.html` | About page |
| `contectus.html` | Contact page |
| `style.css` | Main stylesheet |
| `PHOTOS/` | Images, logo, and graphical assets |
| `README.md` | Project documentation |

---

## System Roles

The system is designed around two main roles.

### Student

Students can log in and access examination-related services through their dashboard.

**Student workflow:**

```text
Student
   │
   ▼
Login
   │
   ▼
Student Dashboard
   │
   ├── Submit Exam Request
   │
   ├── Upload Medical Certificate
   │
   ├── View Announcements
   │
   ├── View Exam Information
   │
   ├── View Results
   │
   └── Manage Student Information
```

### Administrator

Administrators manage examination-related activities through the admin dashboard.

**Administrator workflow:**

```text
Administrator
      │
      ▼
   Admin Login
      │
      ▼
 Admin Dashboard
      │
      ├── Manage Students
      │
      ├── Review Requests
      │
      ├── Approve / Decline Requests
      │
      ├── Manage Announcements
      │
      ├── Manage Exam Information
      │
      ├── Manage Results
      │
      └── View Medical Certificates
```

---

## Main System Workflow

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      Login      │
                    └────────┬────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
          ┌───────────────┐     ┌────────────────┐
          │    Student    │     │ Administrator  │
          │   Dashboard   │     │    Dashboard   │
          └───────┬───────┘     └───────┬────────┘
                  │                     │
          ┌───────┴────────┐     ┌──────┴─────────┐
          │                │     │                │
          ▼                ▼     ▼                ▼
     Exam Requests    Exam Info  Manage        Manage
     Certificates     Results    Students      Requests
          │                              │
          └──────────────┐      ┌────────┘
                         ▼      ▼
                    ┌─────────────┐
                    │  Management │
                    │   Process   │
                    └─────────────┘
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/imamjadh/exam-management-system.git
```

### 2. Navigate to the Project

```bash
cd exam-management-system
```

### 3. Open the Project

Open the project folder in **Visual Studio Code**.

### 4. Run the Application

You can open:

```text
firtspage.html
```

directly in a modern web browser.

### Recommended: Use Live Server

For a better development experience:

1. Open the project in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `firtspage.html`.
4. Select **Open with Live Server**.
5. The application will open in your browser.

---

## Local Development

```text
1. Clone the repository
        ↓
2. Open the project in VS Code
        ↓
3. Install Live Server
        ↓
4. Open firtspage.html
        ↓
5. Start Live Server
        ↓
6. Open the generated local URL
```

---

## Project Objectives

The main objectives of this project are to:

- Centralize university examination activities
- Provide separate student and administrator interfaces
- Simplify examination request submission
- Allow students to submit supporting documents
- Help administrators manage examination requests
- Provide easy access to examination information
- Improve communication through announcements
- Demonstrate practical frontend web development

---

## Concepts Demonstrated

This project demonstrates the practical implementation of:

- Role-based user interfaces
- Dashboard design
- Form handling
- JavaScript DOM manipulation
- Event handling
- Client-side interactions
- Responsive web design
- File upload interfaces
- Student request management
- Administrator management interfaces
- Announcement management
- Examination result interfaces
- Reusable CSS styling
- SVG and image assets

---

## Future Improvements

The current project can be extended with a backend and database to make it a complete production-ready system.

### Backend & Database

- [ ] Backend integration
- [ ] MySQL database integration
- [ ] REST API integration
- [ ] Server-side validation
- [ ] Database-driven student records

### Authentication & Security

- [ ] Secure user authentication
- [ ] Password encryption/hashing
- [ ] Role-based access control
- [ ] Session management
- [ ] Improved security validation

### Examination Management

- [ ] Examination timetable management
- [ ] Online examination functionality
- [ ] Automated result publishing
- [ ] Examination notifications

### Communication

- [ ] Email notifications
- [ ] Automated request status notifications
- [ ] Student notification system

### File Management

- [ ] Secure medical certificate uploads
- [ ] File type validation
- [ ] File size validation
- [ ] Server-side file storage

### Administration

- [ ] Admin user management
- [ ] Advanced student management
- [ ] Search and filtering
- [ ] Activity logs

### Student Portal

- [ ] Improved student profile management
- [ ] Request history
- [ ] Downloadable examination documents
- [ ] Personalized notifications

---

## Current Limitations

This version is primarily a **frontend-based academic project**.

The current implementation does not yet include:

- A production backend
- Persistent database storage
- Secure server-side authentication
- Encrypted passwords
- REST APIs
- Production file storage
- Server-side validation

These features are planned as future improvements.

---

## Repository

**GitHub:**  
https://github.com/imamjadh/exam-management-system

**Author GitHub:**  
https://github.com/imamjadh

---

## Author

**Amanullah Amjadh**

GitHub: https://github.com/imamjadh

---

## License

This project was developed as an **academic and educational project**.

It is intended for learning, demonstration, and portfolio purposes.

---

## Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.
