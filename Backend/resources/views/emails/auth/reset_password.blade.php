<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }

        .email-container {
            width: 100%;
            padding: 40px 20px;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
        }

        .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 100%;
        }

        h1 {
            font-size: 24px;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
            font-weight: 600;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #555;
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-size: 16px;
            text-align: center;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #45a049;
        }

        .footer {
            font-size: 14px;
            text-align: center;
            margin-top: 30px;
            color: #777;
        }

        .footer p {
            margin: 5px 0;
        }

        .copy-url {
            font-size: 14px;
            color: #777;
            background-color: #f7f7f7;
            padding: 10px;
            border-radius: 5px;
            word-wrap: break-word;
            margin-top: 20px;
        }

        @media screen and (max-width: 600px) {
            .container {
                padding: 20px;
            }

            h1 {
                font-size: 22px;
            }

            .button {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="container">
            <h1>Hi {{ $user->email }},</h1>
            <p>You requested to reset your password. To complete this action, click the button below:</p>
            <p><a href="{{ $url }}" class="button">Reset Password</a></p>
            <p>This password reset link will expire in 60 minutes.</p>
            <p>If you did not request a password reset, no further action is required.</p>

            <div class="copy-url">
                <p>If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
                <p><a href="{{ $url }}">{{ $url }}</a></p>
            </div>

            <div class="footer">
                <p>Best regards,</p>
                <p>Weft Team</p>
            </div>
        </div>
    </div>
</body>
</html>
