/**
 * Generate a HTML page with title and content.
 *
 * @param {string} title title of the page
 * @param {string} content HTML content of the page
 * @returns Full HTML page
 */
export function template(title, content) {
  return `<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href="./public/styles.css">
    <script type="module" src="./public/scripts.js"></script>
  </head>
  <body>${content}</body>
</html>`;
}

export function indexTemplate() {
  //index.html, forsíða sem hefur einhvern lýsingartexta (í versta falli lorem ipsum texta).
  const index = '<p>This is some text on your index page. Replace it with your own content.</p>';

  return template('Your Index Page Title', index);
}


