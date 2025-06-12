import nodemailer from 'nodemailer'

export const sendLoginVerificationEmail = async (email: string, verificationUrlYes: string, verificationUrlNo: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adfb2000@gmail.com', // Tu correo de Gmail
            pass: 'ilul sosn ziji rkeg' // La contraseña de aplicación generada
        }
    })

    const mailOptions = {
        from: 'no-reply@tuapp.com',
        to: email,
        subject: 'Verifica tu inicio de sesión',
        html: `
      <p>¿Eres tú quien intenta iniciar sesión?</p>
      <a href="${verificationUrlYes}" style="padding:10px 20px;background:green;color:white;text-decoration:none;">Sí soy yo</a>
      <a href="${verificationUrlNo}" style="padding:10px 20px;background:red;color:white;text-decoration:none;margin-left:10px;">No soy yo</a>
    `
    }

    await transporter.sendMail(mailOptions)
}