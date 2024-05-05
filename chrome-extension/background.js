console.log('Background script running and ready to handle tasks.');

chrome.runtime.onStartup.addListener(() => {
    console.log('Background script started after restarting Chrome.');
});

chrome.tabs.onActivated.addListener(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['contentScript.js']
        });
    });
});
