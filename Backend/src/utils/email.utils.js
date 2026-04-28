import crypto from "crypto";

export function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

/**
 * Generates a professional HTML template for OTP/Security verification
 */
export const generateHTML = (otp, subject, line) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="500" style="border-collapse: collapse; background-color: #ffffff; margin-top: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <tr>
                <td bgcolor="#3182ce" style="padding: 20px; text-align: center;">
                    <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">Security Verification</h2>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px; text-align: center;">
                    <h3 style="color: #2d3748; margin-top: 0;">${subject}</h3>
                    <p style="font-size: 16px; color: #718096; margin-bottom: 25px;">${line}</p>
                    
                    <div style="background-color: #ebf8ff; border: 1px dashed #3182ce; padding: 20px; border-radius: 6px; display: inline-block;">
                        <span style="font-size: 32px; font-weight: bold; color: #2b6cb0; letter-spacing: 5px; font-family: monospace;">${otp}</span>
                    </div>

                    <p style="font-size: 14px; color: #a0aec0; margin-top: 25px;">
                        This code is valid for a limited time. <br>
                        <strong>You can only use this code once.</strong>
                    </p>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f7fafc" style="padding: 20px; text-align: center; border-top: 1px solid #edf2f7;">
                    <p style="font-size: 13px; color: #4a5568; margin: 0; font-weight: 600;">DevOps Tracker Team</p>
                    <p style="font-size: 11px; color: #a0aec0; margin: 5px 0 0 0;">
                        If you did not request this code, please ignore this email or secure your account.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

/**
 * Generates a professional HTML template for server downtime alerts
 */
export const serverDown = (lastChecked, name, url) => {
    const formattedDate = new Date(lastChecked).toLocaleString('en-IN', {
        dateStyle: 'long',
        timeStyle: 'short',
    });

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Down Alert</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f9; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; margin-top: 50px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <tr>
                <td bgcolor="#e53e3e" style="padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">🚨 Service Interruption Alert</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 16px; color: #4a5568; line-height: 1.6;">
                        Hello,
                    </p>
                    <p style="font-size: 16px; color: #4a5568; line-height: 1.6;">
                        This is an automated notification from <strong>DevOps Tracker</strong>. We detected that one of your monitored services is currently unreachable.
                    </p>
                    
                    <div style="background-color: #fff5f5; border-left: 4px solid #e53e3e; padding: 15px; margin: 20px 0;">
                        <p style="margin: 5px 0; color: #2d3748;"><strong>Server Name:</strong> ${name}</p>
                        <p style="margin: 5px 0; color: #2d3748;"><strong>Target URL:</strong> <a href="${url}" style="color: #3182ce;">${url}</a></p>
                        <p style="margin: 5px 0; color: #2d3748;"><strong>Detected At:</strong> ${formattedDate}</p>
                        <p style="margin: 5px 0; color: #2d3748;"><strong>Status:</strong> <span style="color: #e53e3e; font-weight: bold;">CRITICAL / DOWN</span></p>
                    </div>

                    <p style="font-size: 16px; color: #4a5568; line-height: 1.6;">
                        Our system will continue to monitor the status and will notify you once the service is back online.
                    </p>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f7fafc" style="padding: 20px; text-align: center; border-top: 1px solid #edf2f7;">
                    <p style="font-size: 12px; color: #a0aec0; margin: 0;">
                        &copy; ${new Date().getFullYear()} DevOps Tracker. All rights reserved.
                    </p>
                    <p style="font-size: 12px; color: #a0aec0; margin: 5px 0 0 0;">
                        This is an automated system check. Please do not reply to this email.
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

export const serverUp = (lastChecked, name, url) => {
    const formattedDate = new Date(lastChecked).toLocaleString('en-IN', {
        dateStyle: 'long',
        timeStyle: 'short',
    });

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Server Restored</title>
    </head>
    <body style="font-family: 'Segoe UI', sans-serif; background-color: #f4f7f9; margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; margin-top: 50px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <tr>
                <td bgcolor="#10b981" style="padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">✅ Service Restored</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 16px; color: #4a5568;">Great news,</p>
                    <p style="font-size: 16px; color: #4a5568;">Your service is <strong>back online</strong> and responding normally.</p>
                    
                    <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Server:</strong> ${name}</p>
                        <p style="margin: 5px 0;"><strong>URL:</strong> <a href="${url}" style="color: #3182ce;">${url}</a></p>
                        <p style="margin: 5px 0;"><strong>Restored At:</strong> ${formattedDate}</p>
                        <p style="margin: 5px 0; color: #059669;"><strong>Status:</strong> OPERATIONAL / UP</p>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
};