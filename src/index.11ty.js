exports.data = {
  layout: 'default.11ty.js',
  title: 'Home',
};

exports.render = (data) => {
  const items = data.collections.chapters.map((chapter) => `
      <li><a href="${this.url(chapter.url)}">${chapter.data.title}</a></li>
    `);

  return `
    <h1>Übersicht</h1>
    <ul>
      ${items.join('')}
    </ul>
  `;
};
