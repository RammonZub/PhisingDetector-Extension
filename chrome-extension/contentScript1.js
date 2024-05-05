// contentScript.js

console.log("Content script loaded");

function checkEmailsForPhishing() {
    const emails = document.querySelectorAll('.zA');
    console.log(`Found ${emails.length} emails to check.`);
    Array.from(emails).slice(0, 10).forEach((email, index) => {
        const emailContent = email.innerText;
        console.log(`Checking email ${index + 1}: ${emailContent.substring(0, 50)}...`);
        console.log('Before fetch');
        fetch('http://127.0.0.1:5000/detect-phishing', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email_content: emailContent})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            console.log(`Detection result for email ${index + 1}: ${data.is_phishing ? 'Phishing' : 'Not phishing'}`);
            if (data.is_phishing) {
                console.warn(`Phishing detected in email ${index + 1}.`);
                email.style.backgroundColor = '#ffcccc';
            }
        })
        .catch(error => console.error(`Error checking email ${index + 1}:`, error));
    });
}

const observer = new MutationObserver(mutations => {
    console.log('Mutation detected:', mutations);
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length) checkEmailsForPhishing();
    });
});

observer.observe(document.body, {childList: true, subtree: true});
