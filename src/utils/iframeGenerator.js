/**
 * Generate an iframe embed HTML string for a widget.
 *
 * @param {Object} options
 * @param {string} options.widgetId - Your widget ID
 * @param {number|string} [options.width='100%'] - Iframe width (e.g. "100%" or "600")
 * @param {number|string} [options.height='450'] - Iframe height (e.g. "450" or "100%")
 * @param {string} [options.className='widget_preview_iframe'] - Optional CSS class
 * @param {string} [options.frameborder='0'] - Frameborder value
 * @param {string} [options.allow='autoplay; encrypted-media'] - Allow attribute value
 * @param {boolean} [options.allowFullscreen=true] - Whether to add allowfullscreen attribute
 * @param {string} [options.scrolling='no'] - Scrolling attribute
 * @returns {string} - The HTML <iframe> embed code as a string
 */
function generateWidgetIframeHTML({
  widgetId,
  width = '100%',
  height = '450',
  className = 'widget_preview_iframe',
  frameborder = '0',
  allow = 'autoplay; encrypted-media',
  allowFullscreen = true,
  scrolling = 'no',
} = {}) {
  if (!widgetId) {
    console.error('Widget ID is required');
    return '';
  }

  const src = `https://frontend.localhost/embed-widget/${widgetId}`;

  return `<iframe class="${className}" frameborder="${frameborder}" allow="${allow}" ${allowFullscreen ? 'allowfullscreen' : ''} scrolling="${scrolling}" style="visibility: visible; width: ${width}px; height: ${height}px;" src="${src}"></iframe>`;
}

export default generateWidgetIframeHTML;