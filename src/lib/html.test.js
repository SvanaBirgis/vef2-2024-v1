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
      const result = indexTemplate([
        { title: 'foo', html: 'bar.html', courses: [1] },
      ]);

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
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
  molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
  numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
  optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
  obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
  nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
  tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
  quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
  sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
  recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
  minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
  quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
  fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
  consequuntur! Commodi minima excepturi repudiandae velit hic maxime
  doloremque. Quaerat provident commodi consectetur veniam similique ad 
  earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
  fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
  suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
  modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
  totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
  quasi aliquam eligendi, placeat qui corporis!</p>
  <p><a href="leikir.html">Leikir</a></p>
  <p><a href="stada.html">Stöðutafla</a></p>
  </body>
</html>`);
    });
  });
  describe('generate leikir template', () => {
    it('generates correct leikir template', () => {
      const result = leikirTemplate("Gameday");

      expect(result).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>title</title>
    <link rel="stylesheet" href="./public/styles.css">
    <script type="module" src="./public/scripts.js"></script>
  </head>
  <body>
    <h1> Leikjadagskrá </h1>
    <body>
      <p></p>
    </body>
    <a href="./index.html">Til baka</a>
  </body>
</html>`);
    });
  });
  describe('generate stada template', () => {
    it('generates correct stada template', () => {
      const result = stodurTemplate("stodur");

      expect(result).toEqual(`<!doctype html>
<html lang="is">
  <head>
    <meta charset="utf-8">
    <title>title</title>
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
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
