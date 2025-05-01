<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email Address</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            color: #333;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        h1 {
            color: #007bff;
            font-size: 24px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 30px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .url {
            word-break: break-all;
            padding: 10px;
            background-color: #f8f8f8;
            border-radius: 4px;
            font-size: 14px;
            color: #333;
            display: block;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hi {{ $user->email }},</h1>
        <p>Thank you for registering with Weft! To complete your registration, please click the button below to verify your email address:</p>

        <p><a href="{{ $url }}" class="button">Verify Email Address</a></p>

        <p>If you did not create an account, no further action is required.</p>

        <div class="footer">
            <p>Regards,</p>
            <p>The Weft Team</p>

            <p>If you're having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser:</p>

            <a href="{{ $url }}" class="url">{{ $url }}</a>
        </div>
    </div>
</body>
</html>
