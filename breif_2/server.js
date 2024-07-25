const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3004;

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'breif_2'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Define the views directory
app.set('views', path.join(__dirname, 'views'));

// Define the static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes for rendering pages
app.get('/Finalisation', (req, res) => res.render('Finalisation'));
app.get('/index', (req, res) => res.render('index', { message: null }));
app.get('/Maladie', (req, res) => res.render('Maladie'));
app.get('/login', (req, res) => res.render('login', { message: null, messageType: '' }));
app.get('/etape2', (req, res) => res.render('etape2'));
app.get('/etape4', (req, res) => res.render('etape4'));
app.get('/agenda', (req, res) => res.render('agenda'));
app.get('/cycles', (req, res) => res.render('cycles'));
app.get('/plantation', (req, res) => res.render('plantation'));
app.get('/Fertilisation', (req, res) => res.render('Fertilisation'));
app.get('/', (req, res) => res.render('index'));

// Route to handle registration form submission
app.post('/register', (req, res) => {
  const { username, email, password, role = 'user' } = req.body;
  console.log('Received registration data:', req.body);

  // Check if the user already exists
  const checkUserSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserSql, [email], (err, result) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('Internal server error');
    }
    if (result.length > 0) {
      // User already exists
      res.render('login', { 
        message: 'User already registered', 
        messageType: 'error',
        showRegisterMessage: true 
      });
    } else {
      // Insert new user into database
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return res.status(500).send('Internal server error');
        }
        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, hashedPassword, role], (err, result) => {
          if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Internal server error');
          }
          res.render('login', { 
            message: 'Registration successful! You can now log in.', 
            messageType: 'success',
            showRegisterMessage: true 
          });
        });
      });
    }
  });
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error querying user:', err);
      return res.status(500).send('Internal server error');
    }
    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).send('Internal server error');
        }
        if (isMatch) {
          res.redirect('/index');
        } else {
          res.render('login', { 
            message: 'Incorrect email or password', 
            messageType: 'error',
            showLoginMessage: true 
          });
        }
      });
    } else {
      res.render('login', { 
        message: 'Incorrect email or password', 
        messageType: 'error',
        showLoginMessage: true 
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
