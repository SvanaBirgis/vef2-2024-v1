import { writeFile } from 'fs/promises';
import { join } from 'path';
import { indexTemplate, leikirTemplate, stodurTemplate } from './lib/html.js';


import {
  createDirIfNotExists,
  readFile,
  readFilesFromDir,
} from './lib/file.js';

import {
  parseGameJson,
  parseTeamsJson
} from './lib/parse.js';

const INPUT_DIR = './data';
const OUTPUT_DIR = './dist';

let teams;

function isTeamLegal(team) {
  return teams.includes(team);
}

function isScoreLegal(score) {
  if (!Number.isInteger(score)) {
    return false;
  }
  if (score < 0) {
    return false;
  }
  return true;
}

function isGameLegal(game) {
  if (!isTeamLegal(game.home.name)) {
    return false;
  }
  if (!isTeamLegal(game.away.name)) {
    return false;
  }
  if (!isScoreLegal(game.home.score)) {
    return false;
  }
  if (!isScoreLegal(game.away.score)) {
    return false;
  }
  return true;
}

async function main() {
  await createDirIfNotExists(OUTPUT_DIR);

  const files = await readFilesFromDir(INPUT_DIR);
  const potentialGamedays = [];
  const legalGamedays = [];

  for await (const file of files) {
    let isTeams = false;
    if (file.indexOf('gameday') < 0) {
      if (file.indexOf('teams') >= 0) {
        isTeams = true;
      } else {
        continue;
      }
    }
    const fileContents = await readFile(file);

    // parse-a file contents (lesa inn gogn og setja i breytur)
    if (isTeams) {
      teams = parseTeamsJson(fileContents);
    } else {
      const gameday = parseGameJson(fileContents);
      if (gameday !== null && gameday?.date !== null && gameday?.games?.length !== 0) {
        potentialGamedays.push(gameday);
      }
    }
  }


  for (const gameday of potentialGamedays) {
    const {date} = gameday;
    const legalGames = [];
    for (const game of gameday.games) {
      if (isGameLegal(game)) {
        legalGames.push(game);
      }
    }
    legalGamedays.push({
      date,
      games: legalGames
    });

  }

  legalGamedays.sort((x, y) => {
    if (x.date < y.date) {
      return -1;
    }
    if (x.date > y.date) {
      return 1;
    }
    return 0;
  });

  // reikna stig fyrir hver lið
  const pointsDict = {};
  // ef legalGamedays[?].games[?].home.score !== legalGamedays[0].games[0].away.score 
  legalGamedays.forEach(gameday => {
    gameday.games.forEach(game => {
      if (!pointsDict[game.home.name]) {
        pointsDict[game.home.name] = 0
      }
      if (!pointsDict[game.away.name]) {
        pointsDict[game.away.name] = 0
      }
      if (game.home.score > game.away.score) {
        pointsDict[game.home.name] += 3
      }
      if (game.home.score < game.away.score) {
        pointsDict[game.away.name] += 3
      }
      if (game.home.score === game.away.score) {
        pointsDict[game.home.name] += 1
        pointsDict[game.away.name] += 1
      }
      // console.log(game)
    });
    // console.log(gameday)
  });


  const sortedPoints = Object.keys(pointsDict).map((key) => [key, pointsDict[key]]);

  sortedPoints.sort((first, second) => second[1] - first[1]);

  await writeFile(join(OUTPUT_DIR, 'index.html'), indexTemplate(), {
    flag: 'w+',
  });

  await writeFile(join(OUTPUT_DIR, 'leikir.html'), leikirTemplate(legalGamedays), {
    flag: 'w+',
  });

  await writeFile(join(OUTPUT_DIR, 'stada.html'), stodurTemplate(sortedPoints), {
    flag: 'w+',
  });
}

main().catch((error) => {
  console.error('error generating', error);
});
