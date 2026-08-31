<?php
/**
 * ========================================
 * ABDURRAHMAN.TOP - CONTACT FORM EMAIL HANDLER
 * 
 * This script handles form submission and sends:
 * 1. Personalized confirmation email to USER
 * 2. Detailed notification email to ADMIN
 * 
 * SECURITY FEATURES:
 * - CSRF token validation
 * - Input sanitization
 * - Rate limiting
 * - Email header injection prevention
 * 
 * HOSTINGER COMPATIBLE: Uses PHP mail() function
 * ========================================
 */

// ===== CONFIGURATION =====
// 📝 Change these values for your setup
define('ADMIN_EMAIL', 'Contact@AbdurRahman.Top'); // Your admin email
define('ADMIN_NAME', 'AbdurRahman Md Ghufran'); // Your name
define('SITE_NAME', 'AbdurRahman.Top'); // Your website name
define('SITE_URL', 'https://AbdurRahman.Top'); // Your website URL
define('RATE_LIMIT_SECONDS', 60); // Prevent spam: 1 submission per minute per IP

// ===== START SESSION FOR CSRF PROTECTION =====
// 🔐 CSRF (Cross-Site Request Forgery) protection prevents malicious sites 
// from submitting forms on behalf of authenticated users
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ===== GENERATE CSRF TOKEN IF NOT EXISTS =====
// 🛡️ CSRF token is a unique random string that validates form submissions
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// ===== HELPER FUNCTION: Generate CSRF Token for Frontend =====
// 📤 This function outputs the CSRF token for the hidden form field
function getCsrfToken() {
    return $_SESSION['csrf_token'] ?? '';
}

// ===== HELPER FUNCTION: Validate CSRF Token =====
// ✅ Checks if submitted token matches session token
function validateCsrfToken($token) {
    if (!isset($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

// ===== HELPER FUNCTION: Sanitize Input =====
// 🧹 Removes harmful characters and prevents XSS attacks
function sanitizeInput($data) {
    $data = trim($data); // Remove whitespace
    $data = stripslashes($data); // Remove backslashes
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8'); // Convert special chars to HTML entities
    return $data;
}

// ===== HELPER FUNCTION: Validate Email =====
// ✉️ Checks if email format is valid
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// ===== HELPER FUNCTION: Rate Limiting =====
// ⏱️ Prevents spam by limiting submissions per IP address
function isRateLimited($ip, $limitSeconds = RATE_LIMIT_SECONDS) {
    $key = 'form_submission_' . md5($ip);
    $lastSubmission = $_SESSION[$key] ?? 0;
    $currentTime = time();
    
    if (($currentTime - $lastSubmission) < $limitSeconds) {
        return true; // Still within rate limit
    }
    
    $_SESSION[$key] = $currentTime; // Update last submission time
    return false;
}

// ===== HELPER FUNCTION: Send Email =====
// 📧 Sends email using PHP mail() with proper headers
function sendEmail($to, $toName, $subject, $message, $replyTo = null) {
    // 🛡️ Prevent email header injection attacks
    $to = filter_var($to, FILTER_SANITIZE_EMAIL);
    $subject = preg_replace("/[\r\n]/", '', $subject);
    
    // 📦 Email headers
    $headers = [];
    $headers[] = "From: " . ADMIN_NAME . " <" . ADMIN_EMAIL . ">";
    $headers[] = "Reply-To: " . ($replyTo ?? ADMIN_EMAIL);
    $headers[] = "X-Mailer: PHP/" . phpversion();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: text/html; charset=UTF-8";
    
    // 📤 Send email
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

// ===== MAIN FORM PROCESSING =====
// 🎯 Only process if form was submitted via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // 🛡️ STEP 1: Validate CSRF Token
    $csrfToken = $_POST['csrf_token'] ?? '';
    if (!validateCsrfToken($csrfToken)) {
        http_response_code(403); // Forbidden
        echo json_encode(['success' => false, 'message' => 'Security validation failed. Please refresh and try again.']);
        exit;
    }
    
    // 🛡️ STEP 2: Rate Limiting Check
    $userIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (isRateLimited($userIP)) {
        http_response_code(429); // Too Many Requests
        echo json_encode(['success' => false, 'message' => 'Please wait a minute before submitting again.']);
        exit;
    }
    
    // 🧹 STEP 3: Sanitize & Validate Input
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $subject = sanitizeInput($_POST['subject'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');
    
    // ✅ Validation checks
    $errors = [];
    
    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Please enter your full name (minimum 2 characters).';
    }
    
    if (!isValidEmail($email)) {
        $errors[] = 'Please enter a valid email address.';
    }
    
    if (empty($subject) || strlen($subject) < 5) {
        $errors[] = 'Please enter a subject (minimum 5 characters).';
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'Please enter a message (minimum 10 characters).';
    }
    
    // 🚫 If validation failed, return errors
    if (!empty($errors)) {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }
    
    // ===== SEND EMAIL TO USER (Personalized Confirmation) =====
    // 👤 Personalized email for the user who submitted the form
    $userSubject = "Thank you for contacting " . SITE_NAME . ", " . htmlspecialchars($name) . "!";
    
    $userMessage = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Thank You</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f8fafc; padding: 25px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; }
            .footer { text-align: center; padding: 15px; color: #64748b; font-size: 0.9em; }
            .btn { display: inline-block; background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>🎉 Message Received!</h2>
        </div>
        <div class='content'>
            <p>Dear <strong>" . htmlspecialchars($name) . "</strong>,</p>
            <p>Thank you for reaching out to me through " . SITE_NAME . ". I've received your message regarding:</p>
            <p><strong>Subject:</strong> " . htmlspecialchars($subject) . "</p>
            <p>I appreciate you taking the time to contact me. I typically respond within 24-48 hours during business days (Mon-Sat, 9 AM - 7 PM IST).</p>
            <p><strong>What happens next?</strong></p>
            <ul>
                <li>✅ Your message has been securely received</li>
                <li>📧 I'll review your inquiry personally</li>
                <li>💬 You'll receive a personalized response soon</li>
            </ul>
            <p>If this is urgent, you can also reach me directly at:</p>
            <p>📱 <a href='tel:+918825164657'>+91-8825164657</a><br>
            ✉️ <a href='mailto:Contact@AbdurRahman.Top'>Contact@AbdurRahman.Top</a></p>
            <a href='" . SITE_URL . "' class='btn'>Visit My Portfolio</a>
        </div>
        <div class='footer'>
            <p>This is an automated confirmation. Please do not reply to this email.</p>
            <p>&copy; " . date('Y') . " " . SITE_NAME . ". All rights reserved.</p>
        </div>
    </body>
    </html>
    ";
    
    // 📤 Send to user
    $userEmailSent = sendEmail($email, $name, $userSubject, $userMessage, $email);
    
    // ===== SEND EMAIL TO ADMIN (Detailed Notification) =====
    // 👨‍💻 Detailed email for admin (you) with all form data
    $adminSubject = "📬 New Contact Form Submission - " . SITE_NAME;
    
    $adminMessage = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>New Message</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: #1e293b; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 25px; border: 1px solid #e2e8f0; border-radius: 0 0 10px 10px; }
            .field { margin: 15px 0; padding: 12px; background: #f8fafc; border-left: 4px solid #6366f1; border-radius: 4px; }
            .label { font-weight: bold; color: #475569; display: block; margin-bottom: 5px; }
            .value { color: #0f172a; word-wrap: break-word; }
            .footer { text-align: center; padding: 15px; color: #64748b; font-size: 0.9em; }
            .meta { background: #f1f5f9; padding: 10px; border-radius: 5px; font-size: 0.9em; color: #64748b; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>📬 New Contact Form Submission</h2>
            <p style='margin: 5px 0 0 0; opacity: 0.9;'>" . SITE_NAME . "</p>
        </div>
        <div class='content'>
            <div class='meta'>
                <strong>Received:</strong> " . date('F j, Y, g:i A T') . "<br>
                <strong>IP Address:</strong> " . htmlspecialchars($userIP) . "<br>
                <strong>User Agent:</strong> " . htmlspecialchars($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown') . "
            </div>
            
            <div class='field'>
                <span class='label'>👤 Name:</span>
                <span class='value'>" . htmlspecialchars($name) . "</span>
            </div>
            
            <div class='field'>
                <span class='label'>✉️ Email:</span>
                <span class='value'><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></span>
            </div>
            
            <div class='field'>
                <span class='label'>📋 Subject:</span>
                <span class='value'>" . htmlspecialchars($subject) . "</span>
            </div>
            
            <div class='field'>
                <span class='label'>💬 Message:</span>
                <span class='value'>" . nl2br(htmlspecialchars($message)) . "</span>
            </div>
            
            <hr style='margin: 25px 0; border: none; border-top: 1px solid #e2e8f0;'>
            
            <p><strong>Quick Actions:</strong></p>
            <p>
                <a href='mailto:" . htmlspecialchars($email) . "?subject=Re: " . urlencode($subject) . "' style='display: inline-block; background: #6366f1; color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px; margin-right: 10px;'>✉️ Reply to User</a>
                <a href='" . SITE_URL . "/#contact' style='display: inline-block; background: #64748b; color: white; padding: 8px 16px; text-decoration: none; border-radius: 5px;'>🌐 View Portfolio</a>
            </p>
        </div>
        <div class='footer'>
            <p>🔐 This message was sent from your contact form at " . SITE_URL . "</p>
            <p>&copy; " . date('Y') . " " . SITE_NAME . ". All rights reserved.</p>
        </div>
    </body>
    </html>
    ";
    
    // 📤 Send to admin
    $adminEmailSent = sendEmail(ADMIN_EMAIL, ADMIN_NAME, $adminSubject, $adminMessage, $email);
    
    // ===== RETURN RESPONSE =====
    // 🎯 Send JSON response back to frontend JavaScript
    if ($userEmailSent && $adminEmailSent) {
        // ✅ Success: Both emails sent
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you! Your message has been sent successfully. Check your email for confirmation.',
            'user_email_sent' => true,
            'admin_email_sent' => true
        ]);
    } elseif ($userEmailSent) {
        // ⚠️ Partial success: User email sent, admin failed
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message was received. A confirmation email has been sent to you.',
            'user_email_sent' => true,
            'admin_email_sent' => false,
            'warning' => 'Admin notification failed - please check server configuration.'
        ]);
    } else {
        // ❌ Failure: Could not send emails
        http_response_code(500); // Internal Server Error
        echo json_encode([
            'success' => false, 
            'message' => 'Sorry, there was an issue sending your message. Please try again or email me directly at Contact@AbdurRahman.Top'
        ]);
    }
    
    exit; // Stop script execution
}

// ===== GET REQUEST: Return CSRF Token =====
// 🔄 When page loads, JavaScript can fetch the CSRF token
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_csrf') {
    header('Content-Type: application/json');
    echo json_encode(['csrf_token' => getCsrfToken()]);
    exit;
}

// ===== DEFAULT: Redirect to homepage if accessed directly =====
// 🏠 Prevent direct access to this PHP file
header('Location: ' . SITE_URL);
exit;
?>