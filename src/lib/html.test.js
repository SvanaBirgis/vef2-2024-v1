import { describe, expect, it } from '@jest/globals';
import { indexTemplate, leikirTemplate, stodurTemplate, template } from './html';

describe('html', () => {
  describe('generate page template', () => {
    it('generates correct template', () => {
      const result = template('title', 'content');

      expect(result).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>title</title>
    <link rel="stylesheet" href="./public/styles.css">
    <script type="module" src="./public/scripts.js"></script>
  </head>
  <body>content</body>
</html>`);
    });
  });
  describe('generate index template', () => {
    it('generates correct template', () => {
      const result = indexTemplate([]);

      expect(result).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Boltadeildin</title>
    <link rel="stylesheet" href="./public/styles.css">
    <script type="module" src="./public/scripts.js"></script>
  </head>
  <body>
  <h1> Boltadeildin 2023 - 2024 </h1>
  <p>Síðan inniheldur leikjadagskrá og stöðutöflu Boltadeildarinnar tímabilið 2023-2024</p>
  <p><a href="leikir.html">Leikir</a></p>
  <p><a href="stada.html">Stöðutafla</a></p>
  </body>
</html>`);
    });
  });
  describe('generate leikir template', () => {
    it('generates correct leikir template', () => {
      const result = leikirTemplate([]);

      expect(result).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Leikir</title>
    <link rel="stylesheet" href="./public/styles.css">
    <script type="module" src="./public/scripts.js"></script>
  </head>
  <body>
  <h1> Leikjadagskrá </h1>
  <body></body>
  <a href="./index.html">Til baka</a>
  </body>
</html>`);
    });
  });
  describe('generate stada template', () => {
    it('generates correct stada template', () => {
      const result = stodurTemplate([]);

      expect(result).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>Stöðutafla</title>
    <link rel="stylesheet" href="./public/styles.css">
    <script type="module" src="./public/scripts.js"></script>
  </head>
  <body>
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
      
    </tbody>
  </table>
</div>
<p><a href="./index.html">Til baka</a></p>
</div>
  </body>
</html>`);
    });
  });
});
