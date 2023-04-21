function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
  
  browser.contextMenus.create({
    id: 'download-gif',
    title: 'Yoink!',
    contexts: ['page', 'link'],
    documentUrlPatterns: ['*://*.twitter.com/*']
  });
  
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'download-gif') {
      browser.tabs.sendMessage(tab.id, { action: 'findGifUrl' })
        .then((gifUrl) => {
          if (gifUrl) {
            const randomFilename = generateRandomString(6) + '.mp4';
            browser.downloads.download({ url: gifUrl, filename: randomFilename, saveAs: true });
          }
        });
    }
  });
  
  
  
  