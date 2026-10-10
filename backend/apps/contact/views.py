import logging
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)


class ContactMessageCreateView(generics.CreateAPIView):
    """
    Public API endpoint to submit a contact message.
    Saves to the database and dispatches a real-time email notification.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        # Send real-time notification email
        email_sent = self.send_notification_email(instance)

        return Response(
            {
                "success": True,
                "message": "Thank you! Your message has been received successfully.",
                "email_sent": email_sent,
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    def send_notification_email(self, instance):
        recipient = getattr(settings, 'CONTACT_NOTIFICATION_EMAIL', 'rushikeshlale1@gmail.com')
        sender = getattr(settings, 'DEFAULT_FROM_EMAIL', getattr(settings, 'EMAIL_HOST_USER', 'rushikeshlale1@gmail.com'))
        subject = f"Portfolio Inquiry: {instance.subject or 'New Project Message'} from {instance.name}"

        plain_text = f"""
Hello Rushikesh,

You received a new inquiry from your portfolio website!

--------------------------------------------------
Sender Name  : {instance.name}
Sender Email : {instance.email}
Subject      : {instance.subject or 'N/A'}
Date & Time  : {instance.created_at.strftime('%d %B %Y at %I:%M %p UTC')}
--------------------------------------------------

Message:
{instance.message}

--------------------------------------------------
To respond, simply reply directly to this email or write to: {instance.email}
"""

        html_content = f"""
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9fafb; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 20px;">New Portfolio Inquiry</h2>
      <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 14px;">Someone reached out from your portfolio contact form.</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: bold; width: 120px;">SENDER NAME:</td>
          <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #111827;">{instance.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: bold;">SENDER EMAIL:</td>
          <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:{instance.email}" style="color: #6366f1; text-decoration: none;">{instance.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280; font-size: 13px; font-weight: bold;">SUBJECT:</td>
          <td style="padding: 8px 0; font-size: 14px; color: #374151;">{instance.subject or 'N/A'}</td>
        </tr>
      </table>

      <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; border-left: 4px solid #6366f1; margin-bottom: 24px;">
        <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #4b5563; margin-bottom: 8px;">Message:</div>
        <p style="margin: 0; font-size: 14px; color: #1f2937; white-space: pre-line;">{instance.message}</p>
      </div>

      <div style="text-align: center;">
        <a href="mailto:{instance.email}?subject=Re: {instance.subject or 'Portfolio Inquiry'}" 
           style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 14px;">
          Reply to {instance.name}
        </a>
      </div>
    </div>
    
    <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      This email was automatically dispatched by your Django Portfolio API.
    </div>
  </div>
</body>
</html>
"""

        try:
            # Check if SMTP password is provided when using SMTP backend
            is_smtp = 'smtp' in getattr(settings, 'EMAIL_BACKEND', '').lower()
            smtp_pass = getattr(settings, 'EMAIL_HOST_PASSWORD', '')

            if is_smtp and not smtp_pass:
                logger.warning(
                    "[SMTP Warning] EMAIL_HOST_PASSWORD is not set in backend/.env. "
                    "Skipping live SMTP dispatch to prevent timeout. "
                    "Set your Google App Password in .env to enable real-time delivery."
                )
                print(
                    "\n--- [DEV PREVIEW: CONTACT MESSAGE SUBMITTED] ---"
                    f"\nFrom: {instance.name} <{instance.email}>"
                    f"\nSubject: {instance.subject}"
                    f"\nMessage: {instance.message}"
                    "\n(To send real emails to your Gmail inbox, add EMAIL_HOST_PASSWORD in backend/.env)\n"
                )
                return False

            msg = EmailMultiAlternatives(
                subject=subject,
                body=plain_text,
                from_email=sender,
                to=[recipient],
                reply_to=[instance.email]
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send(fail_silently=False)
            logger.info(f"Contact notification email sent to {recipient}")
            return True
        except Exception as exc:
            logger.error(f"Failed to dispatch contact email: {exc}")
            return False

