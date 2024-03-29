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
  // index.html, forsíða sem hefur einhvern lýsingartexta (í versta falli lorem ipsum texta).
  const index = `
  <h1> Boltadeildin 2023 - 2024 </h1>
  <p>Síðan inniheldur leikjadagskrá og stöðutöflu Boltadeildarinnar tímabilið 2023-2024.</p>
  <p><a href="leikir.html">Leikir</a></p>
  <p><a href="stada.html">Stöðutafla</a></p>
  `;
  return template('Boltadeildin', index);
}

export function leikurTemplate(date, game) {
  const homeName = game.home ? game.home.name : 'N/A';
  const awayName = game.away ? game.away.name : 'N/A';
  const homeScore = game.away ? game.away.score : 'N/A';
  const awayScore = game.away ? game.away.score : 'N/A';
  const myDate = new Date(date);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = myDate.toLocaleDateString('en-US', options);

  // leikir.html, síða sem birtir alla leiki í deildinni, raðaða eftir dagsetningu leiks (elsta dagsetning efst).
  return `<p>${formattedDate} - ${homeName}: ${homeScore} vs. ${awayName}: ${awayScore} </p>`;

}

export function leikdagurTemplate(gameday) {
  // ítra í gegnum gameday.games
  gameday.games.map(leikurTemplate);
  const ouput = [];
  gameday.games.forEach(game => {
    ouput.push(leikurTemplate(gameday.date, game));
  });
  return ouput.join('');
}

export function leikirTemplate(Gamedays) {
  const leikir = `
  <h1> Leikjadagskrá </h1>
  <body>${Gamedays.map(leikdagurTemplate).join('')}</body>
  <a href="./index.html">Til baka</a>
  `;

  return template('Leikir', leikir)
}

export function stadaTemplate(seat, index) {
  const name = seat[0]
  const point = seat[1]
  return `<tr>
  <td>${index + 1}</td>
  <td>${name}</td>
  <td>${point}</td>
  </tr>`;
}

export function stodurTemplate(points) {
  // console.log(points)
  // reikna stig og birta 
  const tafla = `
  <h1> Stöðutaflan </h1>
  <div class="table">
  <table>
    <thead>
      <tr>
        <th>Sæti</th>
        <th>Lið</th>
        <th>Stig</th>
      </tr>
    </thead>
    <tbody>
      ${points.map(stadaTemplate).join('')}
    </tbody>
  </table>
</div>
<p><a href="./index.html">Til baka</a></p>
</div>
  `;
  return template('Stöðutafla', tafla)
}



