// PWA Registration Script
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Install prompt handling
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show install button or banner
  showInstallButton();
});

function showInstallButton() {
  // Create install button
  const installButton = document.createElement('button');
  installButton.textContent = 'Install Email Zus App';
  installButton.className = 'btn btn-primary position-fixed';
  installButton.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000;';
  
  installButton.addEventListener('click', () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        installButton.remove();
      });
    }
  });
  
  document.body.appendChild(installButton);
}

// Handle app installed
window.addEventListener('appinstalled', (evt) => {
  console.log('Email Zus app was installed');
  // Hide install button
  const installButton = document.querySelector('button[style*="bottom: 20px"]');
  if (installButton) {
    installButton.remove();
  }
});
