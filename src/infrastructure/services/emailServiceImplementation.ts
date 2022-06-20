import 'dotenv/config'
import IEmailService from '../../aplication/infrastructureServices/emailService';
var nodemailer = require('nodemailer');

class EmailService implements IEmailService{

    static emailService: IEmailService;

    private transporter: any;
    private email: any;

    constructor(){
        this.email = process.env.EMAIL;
        this.transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: this.email,
              pass: process.env.EMAIL_PASSWORD,
            }
          });
    }

    static getInstance(): IEmailService{
      if(!this.emailService) this.emailService = new EmailService();
      return this.emailService; 
    }

    sendEmail(to: string, subject: string, text: string): void{
        var mailOptions = {
            from: this.email,
            to: to,
            subject: subject,
            text: text
          };
          
          this.transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }

}

export default EmailService;
