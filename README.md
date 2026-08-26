# VasifyTech Suite (vt_suite.1)

All-in-one business management platform featuring HR, CRM, Projects, Finance, and Workspace tools.

## Getting Started

First, install frontend dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages Included
- **Home**: [http://localhost:3000](http://localhost:3000)
- **Features**: [http://localhost:3000/features](http://localhost:3000/features)
- **Pricing**: [http://localhost:3000/pricing](http://localhost:3000/pricing)
- **About**: [http://localhost:3000/about](http://localhost:3000/about)
- **Contact**: [http://localhost:3000/contact](http://localhost:3000/contact)
- **Roadmap**: [http://localhost:3000/roadmap](http://localhost:3000/roadmap)
- **Sign In**: [http://localhost:3000/signin](http://localhost:3000/signin)
- **Start Free Trial (Signup Form)**: [http://localhost:3000/signup](http://localhost:3000/signup)
- **Admin Users Directory**: [http://localhost:3000/admin/users](http://localhost:3000/admin/users)

---

# VT Suite Database Setup

Follow these step-by-step instructions to set up the separate MySQL backend database for VT Suite:

### Step 1: Install MySQL
Download and install [MySQL Server](https://dev.mysql.com/downloads/mysql/) (or use XAMPP / WAMP / MySQL Docker container). Ensure MySQL service is running on `localhost:3306`.

### Step 2: Create Database & Execute Schema
Run the schema script located in `backend/database/schema.sql` using MySQL CLI or MySQL Workbench:

```sql
CREATE DATABASE IF NOT EXISTS vt_suite;

USE vt_suite;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(150) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    company_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Command line shortcut:
```bash
mysql -u root -p < backend/database/schema.sql
```

### Step 3: Configure `.env`
Open `backend/.env` (or copy from `backend/.env.example`) and adjust your database connection credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=vt_suite
PORT=5000
```

### Step 4: Install Backend Dependencies
Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

### Step 5: (Optional) Seed Sample Data
Populate sample users into `users` table:

```bash
npm run seed
```

### Step 6: Start Backend Server
Start the Express server on port 5000:

```bash
npm start
# or for development mode:
npm run dev
```

### Step 7: Start Frontend App
In a separate terminal window at the project root directory, run:

```bash
npm run dev
```

### Step 8: Test `/api/users` Endpoint
Open your browser or API client (Postman/curl) and test:
```text
GET http://localhost:5000/api/users
```
Expected response:
```json
{
  "success": true,
  "users": []
}
```

### Step 9: Submit the VT Suite Form
Go to [http://localhost:3000/signup](http://localhost:3000/signup) in your browser.
Fill in:
- **Your Name**: Kapil Rade
- **Mobile Number**: 9876543210
- **Work Email**: kapil@example.com
- **Company Name**: ABC Technologies

Click **Start My Free Trial**.

You will see the message: `"Your information has been submitted successfully."`

### Step 10: Verify the Record in MySQL
Check your database in MySQL CLI or Admin GUI:

```sql
SELECT * FROM vt_suite.users;
```

Or view and manage all records directly via the VT Suite Admin UI at [http://localhost:3000/admin/users](http://localhost:3000/admin/users).
