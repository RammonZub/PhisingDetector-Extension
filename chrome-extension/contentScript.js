console.log("Content script loaded");

function getEmailContent() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const emailBody = document.querySelector('div.gs');
            if (emailBody) {
                let textContent = emailBody.innerText || emailBody.textContent;
                resolve(textContent);
            } else {
                reject('Email content not found');
            }
        }, 3000);
    });
}

async function checkEmailForPhishing(emailNode) {
    console.log("Checking individual email for phishing.");
    try {
        const emailContent = await getEmailContent();
        const senderEmailSpan = document.querySelector('span[email]');
        const senderEmail = senderEmailSpan ? senderEmailSpan.getAttribute('email') : 'Sender email not found';

        console.log('Sender Email:', senderEmail);
        console.log('Email Content:', emailContent);

        const response = await fetch('http://127.0.0.1:5000/detect-phishing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_content: emailContent, sender_email: senderEmail })
        });
        const data = await response.json();
        if (data.is_phishing) {
            console.warn(`Phishing detected.`);
            emailNode.style.backgroundColor = 'rgba(255, 204, 204, 0.5)'; // Visual feedback
            alert('Warning: Phishing email detected!');
        } else {
            console.log('Email is not phishing.');
            emailNode.style.backgroundColor = 'rgba(204, 255, 204, 0.5)'; // Visual feedback
        }
    } catch (error) {
        console.error('Error in phishing detection:', error);
    }
}

document.addEventListener('click', function(event) {
    let target = event.target;
    while (target != null) {
        if (target.matches('.zA')) { // Email item selector, adjust as necessary
            checkEmailForPhishing(target);
            break;
        }
        target = target.parentElement;
    }
}, true);
