interface IEmailService {
    sendEmail(to: string, subject: string, text: string): void;
}

export default IEmailService;