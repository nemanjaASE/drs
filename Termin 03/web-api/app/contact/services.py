import os
from .schemas import ContactMessage
import mailtrap as mt
from flask import current_app

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
            
            client = mt.MailtrapClient(token=current_app.config["TOKEN"], sandbox=True, inbox_id=int(current_app.config["INBOX_ID"]))
            response = client.send(mail)
            
            print(f"Email poslat: {response}")
            return True, "Email sent successfully"
            
        except Exception as e:
            error_msg = f"Greška pri slanju emaila: {str(e)}"
            print(error_msg)
            return False, error_msg