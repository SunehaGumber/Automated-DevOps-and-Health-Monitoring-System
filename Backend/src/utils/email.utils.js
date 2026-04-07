import crypto from 'crypto';

export function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}

export function generateHTML(otp,subject,line) {
    return  `<!DOCTYPE html>
            <html lang="en">
            <head>
                <title></title>
            </head>
            <body>
                <div>
                    <h2>${subject}</h2>
                    <h1>${otp}</h1>
                    <p>${line}.</p>
                    <p>You can only use this code once.</p>
                    <p>Regards</p>
                    <p>Devops tracker.</p>
                </div>
            </body>
        </html>
    `       
}