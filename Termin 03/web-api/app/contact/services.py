import os
from dotenv import load_dotenv
from .schemas import ContactMessage
import mailtrap as mt

load_dotenv()  

class ContactService:
    @staticmethod
    def send_email(contact_message: ContactMessage) -> tuple[bool, str]:
        """Posalje email preko Mailtrap-a.

        Args:
            contact_message: ContactMessage objekat sa name, email, message

        Returns:
            Tuple (True, "message") ako je poslat email
            Tuple (False, "error_message") ako greška
        """
        try:
            token = os.getenv('MAILTRAP_TOKEN')
            inbox_id = os.getenv('MAILTRAP_INBOX_ID')

            


            # Debug - proveri da li su kredencijali učitani
            if not token:
                return False, "MAILTRAP_TOKEN nije postavljen u .env fajlu"
            if not inbox_id:
                return False, "MAILTRAP_INBOX_ID nije postavljen u .env fajlu"
            
            inbox_id = int(inbox_id)

            mail = mt.Mail(
                sender=mt.Address(
                    email="noreply@userhub.com",  
                    name="UserHub Contact"
                ),
                to=[mt.Address(email=contact_message.email)],  
                subject=f"Novi kontakt od {contact_message.name}",
                text=f"Ime: {contact_message.name}\nEmail: {contact_message.email}\n\nPoruka:\n{contact_message.message}",
                category="Contact Form",
            )
            
            client = mt.MailtrapClient(token=token, sandbox=True, inbox_id=inbox_id)
            response = client.send(mail)
            
            print(f"Email poslat: {response}")
            return True, "Email sent successfully"
            
        except Exception as e:
            error_msg = f"Greška pri slanju emaila: {str(e)}"
            print(error_msg)
            return False, error_msg