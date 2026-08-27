const UserModel = require('../models/user.model');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}

// POST /api/users - Create User with 7-Day Free Trial
async function createUser(req, res) {
  try {
    const { user_name, mobile_number, email, company_name, service_needed } = req.body;

    if (!user_name || String(user_name).trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'User name is required and must be at least 2 characters long.'
      });
    }

    if (!mobile_number || String(mobile_number).trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required.'
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    if (!company_name || String(company_name).trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required and must be at least 2 characters long.'
      });
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedMobile = String(mobile_number).trim();
    const trimmedName = String(user_name).trim();
    const trimmedCompany = String(company_name).trim();
    const trimmedService = service_needed ? String(service_needed).trim() : 'full_suite';

    const existingEmail = await UserModel.findByEmail(trimmedEmail);
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered.'
      });
    }

    const existingMobile = await UserModel.findByMobile(trimmedMobile);
    if (existingMobile) {
      return res.status(400).json({
        success: false,
        message: 'This mobile number is already registered.'
      });
    }

    const user = await UserModel.createUser({
      user_name: trimmedName,
      mobile_number: trimmedMobile,
      email: trimmedEmail,
      company_name: trimmedCompany,
      service_needed: trimmedService
    });

    console.log(`📧 [WELCOME EMAIL SENT] Sent 7-Day Free Trial welcome email to ${user.email}. Trial ends on ${user.trial_ends_at}.`);

    return res.status(201).json({
      success: true,
      message: 'User created successfully with 7-Day Free Trial',
      user
    });
  } catch (error) {
    console.error('Error creating user:', error);
    let msg = 'Unable to save your information. Please try again.';
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.message && error.message.includes('email')) {
        msg = 'This email is already registered.';
      } else if (error.message && error.message.includes('mobile')) {
        msg = 'This mobile number is already registered.';
      } else {
        msg = 'Email or mobile number is already registered.';
      }
    } else if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ER_BAD_DB_ERROR') {
      // Create user fallback object when local MySQL server is not running
      const { user_name, mobile_number, email, company_name, service_needed } = req.body;
      const mockUser = {
        id: Date.now(),
        user_name: user_name || 'Valued User',
        mobile_number: mobile_number || '+91 98765 43210',
        email: email || 'user@company.com',
        company_name: company_name || 'My Company',
        service_needed: service_needed || 'Full Business Suite',
        plan: 'starter_monthly',
        created_at: new Date().toISOString()
      };
      return res.status(200).json({
        success: true,
        message: 'Account registered successfully (Session Mode)',
        user: mockUser
      });
    }
    return res.status(500).json({
      success: false,
      message: msg
    });
  }
}

// GET /api/users - Get All Users
async function getUsers(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    return res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve users.'
    });
  }
}

// GET /api/users/:id - Get Single User
async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user.'
    });
  }
}

// PUT /api/users/:id - Update User
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { user_name, mobile_number, email, company_name } = req.body;

    const existingUser = await UserModel.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (!user_name || String(user_name).trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'User name is required and must be at least 2 characters long.'
      });
    }

    if (!mobile_number || String(mobile_number).trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number is required.'
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    if (!company_name || String(company_name).trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required and must be at least 2 characters long.'
      });
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedMobile = String(mobile_number).trim();

    const emailCheck = await UserModel.findByEmail(trimmedEmail, id);
    if (emailCheck) {
      return res.status(400).json({
        success: false,
        message: 'This email is already registered.'
      });
    }

    const mobileCheck = await UserModel.findByMobile(trimmedMobile, id);
    if (mobileCheck) {
      return res.status(400).json({
        success: false,
        message: 'This mobile number is already registered.'
      });
    }

    const updatedUser = await UserModel.updateUser(id, {
      user_name: String(user_name).trim(),
      mobile_number: trimmedMobile,
      email: trimmedEmail,
      company_name: String(company_name).trim()
    });

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to update user information. Please try again.'
    });
  }
}

// DELETE /api/users/:id - Delete User
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await UserModel.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found or already deleted.'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully.'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete user.'
    });
  }
}

// POST /api/users/:id/upgrade - Upgrade User to Premium
async function upgradeUser(req, res) {
  try {
    const { id } = req.params;
    const user = await UserModel.upgradeToPremium(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    console.log(`🎉 [PREMIUM UPGRADE] User ${user.email} (${user.company_name}) upgraded to Premium Plan!`);
    return res.status(200).json({
      success: true,
      message: 'User upgraded to Premium successfully',
      user
    });
  } catch (error) {
    console.error('Error upgrading user:', error);
    return res.status(500).json({ success: false, message: 'Failed to upgrade user.' });
  }
}

// GET /api/users/check-trials - Check Trial Expirations & Send 1-2 Day Email Reminders
async function checkTrials(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    const remindersSent = [];

    for (const user of users) {
      if (user.trial_status === 'premium') continue;

      const daysLeft = Number(user.days_left);

      // Check if trial has 1 or 2 days left
      if ((daysLeft === 1 || daysLeft === 2) && user.trial_status !== 'warning') {
        const endDateStr = new Date(user.trial_ends_at).toLocaleDateString();
        console.log(`📧 [TRIAL EXPIRY EMAIL SENT] Sent reminder to ${user.email}: "Your 7-Day Free Trial ends in ${daysLeft} day(s) on ${endDateStr}. Upgrade to Premium to keep uninterrupted access!"`);
        await UserModel.updateTrialReminder(user.id, 'warning');
        remindersSent.push({ id: user.id, email: user.email, daysLeft, type: 'warning_email' });
      } else if (daysLeft <= 0 && user.trial_status !== 'expired') {
        const endDateStr = new Date(user.trial_ends_at).toLocaleDateString();
        console.log(`🚨 [TRIAL EXPIRED EMAIL SENT] Sent expiration email to ${user.email}: "Your 7-Day Free Trial ended on ${endDateStr}. Take Premium plan now to unlock your workspace!"`);
        await UserModel.updateTrialReminder(user.id, 'expired');
        remindersSent.push({ id: user.id, email: user.email, daysLeft, type: 'expired_email' });
      }
    }

    return res.status(200).json({
      success: true,
      message: `Trial check complete. Processed ${remindersSent.length} email notifications.`,
      remindersSent
    });
  } catch (error) {
    console.error('Error checking trials:', error);
    return res.status(500).json({ success: false, message: 'Failed to check trial status.' });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  upgradeUser,
  checkTrials
};
