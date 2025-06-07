<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Verify Email Address</title>
  <style>
    body {
      background: #f4f4f5;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #27272a;
      margin: 0;
      padding: 1rem;
    }
    .email-container {
      max-width: 600px;
      margin: 2rem auto;
    }
    .container {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 10px 15px -3px rgba(39, 39, 42, 0.1);
      position: relative;
    }
    .container::before {
      content: '';
      position: absolute;
      top: -15px; left: -15px; right: -15px; bottom: -15px;
      border-radius: 1rem;
      background: linear-gradient(90deg, #71717a, #a1a1aa, #71717a);
      opacity: 0.15;
      filter: blur(15px);
      z-index: -1;
    }
    h1 {
      font-weight: 700;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    a.button {
      display: inline-block;
      background-color: #000000;
      color: #ffffff;
      padding: 0.75rem 1.5rem;
      border-radius: 0.75rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    a.button:hover {
      background-color: #222222;
    }
    .copy-url a {
      word-break: break-all;
      color: #52525b;
      text-decoration: underline;
    }
    .footer p {
      margin: 0.25rem 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="container">
      <h1>Hi {{ $user->email }},</h1>
      <p>Thank you for registering with Weft! To complete your registration, please click the button below to verify your email address:</p>
      <p><a href="{{ $url }}" class="button">Verify Email Address</a></p>
      <p>If you did not create an account, no further action is required.</p>
      <div class="copy-url">
        <p>If you're having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser:</p>
        <p><a href="{{ $url }}">{{ $url }}</a></p>
      </div>
      <div class="footer">
        <p>Regards,</p>
        <p>The Weft Team</p>
      </div>
    </div>
  </div>
</body>
</html>
