const footer = require('./partials/footer.11ty');

exports.render = (pageData) => {
  const data = pageData;

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Online Sports Communities // ${data.title}</title>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
      />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/assets/main.css" />

      <script src="/assets/scripts/main.js" async></script>
      <script src="https://cdn.jsdelivr.net/npm/mustache@4.2.0/mustache.min.js" async></script>
      <script src="https://unpkg.com/vue@3"></script>

    </head>
    <body>
    ${data.content}
    ${footer.html}
    </body>
  </html>`;
};
