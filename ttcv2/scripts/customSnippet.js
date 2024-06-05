// Only declare 'site' variable if it's not already declared
if (!window.site) {
  const site = window.location.hostname;
  
  // JavaScript codes for TankTrouble
  if (site.includes("tanktrouble.com")) {
    // Load external CSS file
    loadCSS('ttcv2/css/classicStyle.css');
    
    // Create custom HTML element
    createCustomElement('div', 'id', 'helpSnippet', `
      <div class="content">
        <div class="header">Need Help?</div>
        <div style="color: #fff;"><a href="https://tinyurl.com/ttrulesdoc" target="_blank">Check the FAQ</a></div>
      </div>
    `);
  }
}
