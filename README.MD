# Personal Portfolio Website

A modern, responsive portfolio website built with React and Bootstrap. This project showcases skills, projects, and includes a fully functional contact form with email integration.

## 📋 About

This is a practice project created to learn React, Bootstrap, and full-stack development concepts. The website features a clean, professional design with smooth animations and a working contact form that sends emails directly to your inbox.

**Tutorial Credit:** This project was built following [this YouTube tutorial](https://www.youtube.com/watch?v=hYv6BM2fWd8&t=1411s) by Webdecoded.

## ✨ Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI** - Clean interface with smooth animations and transitions
- **Skills Section** - Showcase your technical skills with visual indicators
- **Projects Showcase** - Display your portfolio projects with images and descriptions
- **Contact Form** - Fully functional contact form with email integration
- **Email Notifications** - Receive contact form submissions directly to your email

## 🛠️ Technologies Used

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Bootstrap** - Bootstrap components built for React
- **CSS3** - Custom styling and animations

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Nodemailer** - Email sending functionality
- **CORS** - Cross-Origin Resource Sharing middleware

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd my-portfolio-react
```

### 2. Install dependencies

**Install root-level dependencies (for backend server):**
```bash
npm install
```

**Install frontend dependencies:**
```bash
cd my-portfolio
npm install
```

## ⚙️ Configuration

### Email Setup (for Contact Form)

To enable the contact form to send emails, you need to configure your email credentials:

1. Set the environment variable for your email password:

**Mac/Linux:**
```bash
export EMAIL_PASS="your-email-password"
```

**Windows (Command Prompt):**
```cmd
set EMAIL_PASS=your-email-password
```

**Windows (PowerShell):**
```powershell
$env:EMAIL_PASS="your-email-password"
```

2. **Optional:** Create a `.env` file in the root directory:
```env
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
PORT=5000
```

⚠️ **Security Note:** Never commit your `.env` file to Git. Add it to `.gitignore`.

## 🏃‍♂️ Running the Project

You'll need to run both the frontend and backend servers:

### Terminal 1: Start the Backend Server
```bash
# From the root directory
node server.cjs
```

You should see:
```
🚀 SERVER STARTED SUCCESSFULLY
📍 Running on: http://localhost:5000
```

### Terminal 2: Start the Frontend Development Server
```bash
# Navigate to the frontend directory
cd my-portfolio

# Start the development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## 📁 Project Structure

```
my-portfolio-react/
├── my-portfolio/              # Frontend React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Banner.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── Skills.jsx
│   │   ├── assets/            # Images, fonts, and static files
│   │   │   ├── img/
│   │   │   └── fonts/
│   │   ├── App.jsx            # Main App component
│   │   ├── App.css            # Main styles
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server.cjs                 # Backend Express server
├── package.json               # Backend dependencies
└── README.md
```

## 🎨 Customization

### Update Personal Information

1. **Components:** Edit the content in `src/components/` to add your own information
2. **Images:** Replace images in `src/assets/img/` with your own
3. **Styling:** Modify `App.css` and component styles to match your preferences
4. **Email:** Update `EMAIL_USER` in `server.cjs` with your email address

## 📧 Contact Form Configuration

The contact form uses Nodemailer to send emails. Default configuration:
- **Server:** mail.server.com
- **Port:** 465 (SSL/TLS)
- **Email:** your-email

To use your own email server, edit `server.cjs`:
```javascript
const transporter = nodemailer.createTransport({
  host: "your-mail-server.com",
  port: 465,
  secure: true,
  auth: {
    user: "your-email@domain.com",
    pass: EMAIL_PASS,
  },
});
```

### Using Gmail (Alternative)
```javascript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-specific-password' // Not your regular password!
  }
});
```

⚠️ **Note:** For Gmail, you need to use an [App-Specific Password](https://support.google.com/accounts/answer/185833).

## 🐛 Troubleshooting

### CORS Errors
- Make sure both frontend and backend servers are running
- Verify the frontend is on `http://localhost:5173`
- Check that the backend is on `http://localhost:5000`

### Email Not Sending
- Verify `EMAIL_PASS` environment variable is set
- Check email server credentials are correct
- Look at server terminal for error messages

### Port Already in Use
```bash
# Kill processes on port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Or change the port in server.cjs
const PORT = process.env.PORT || 3000;
```

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Express.js Guide](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Tutorial by [Tutorial Creator Name](https://www.youtube.com/watch?v=hYv6BM2fWd8&t=1411s)
- React Bootstrap community
- All the amazing open-source libraries used in this project

## 📸 Screenshots

<!-- Add screenshots of your portfolio here -->
![Homepage](screenshots/homepage.png)
![Skills Section](screenshots/skills.png)
![Projects](screenshots/projects.png)
![Contact Form](screenshots/contact.png)

---

**Built with ❤️ for learning and practice**