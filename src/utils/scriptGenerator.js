(async function() {
  const scripts = document.querySelectorAll('script[data-widget-id]');
  scripts.forEach(script => {
    const widgetId = script.getAttribute('data-widget-id');
    if (!widgetId) return;

    const iframeUrl = `https://frontend.localhost/embed-widget/${encodeURIComponent(widgetId)}`;
    
    const iframe = document.createElement('iframe');
    iframe.src = iframeUrl;
    iframe.width = '100%';
    iframe.height = '450';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;
    iframe.scrolling = 'no';
    iframe.style.visibility = 'visible';

    const wrapper = document.createElement('div');
    wrapper.className = 'my-widget-wrapper';
    wrapper.appendChild(iframe);

    script.parentNode.insertBefore(wrapper, script.nextSibling);
  });
})();
