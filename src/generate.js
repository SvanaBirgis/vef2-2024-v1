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
      let gameday = parseGameJson(fileContents);
      if (gameday !== null && gameday?.date !== null && gameday?.games?.length !== 0) {
        potentialGamedays.push(gameday);
      }
    }
  }


  for (let gameday of potentialGamedays) {
    let date = gameday.date;
    let legalGames = [];
    for (let game of gameday.games) {
      if (isGameLegal(game)) {
        legalGames.push(game);
      }
    }
    legalGamedays.push({
      date: date,
      games: legalGames
    });

  }
  //console.log(legalGamedays);
  for (let gameday of legalGamedays) {
    //console.log(gameday.date)
    gameday.games.forEach((game) => {
      //console.log(game)
    })
  }
}

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

main().catch((error) => {
  console.error('error generating', error);
});
