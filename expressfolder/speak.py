import pyttsx3
import sys


firstname = sys.argv[1]
phone = sys.argv[2]
email = sys.argv[3]

ttsEngine = pyttsx3.init()


# create message
message = f"""
Dear {firstname},  

Welcome to RCCG Newspring Youth Church! We are delighted to have you join our community of faith, growth, and purpose.  

At Newspring, we believe that every individual has a divine calling, and we are committed to helping you grow spiritually, build meaningful connections, and make a positive impact.  

As you embark on this journey with us, know that you are not alone. We are here to support, pray with, and walk alongside you.  

May this new chapter bring you closer to God’s purpose for your life.  

God bless you, and once again, welcome to the family!  

**Warm regards,**  
RCCG Newspring Youth Church Team  
"""

ttsEngine.say(message)
ttsEngine.runAndWait()

print(message)


