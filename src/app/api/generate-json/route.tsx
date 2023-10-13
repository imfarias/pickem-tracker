import csvToJson from 'csvtojson';

import fs from 'fs';

import {NextResponse} from 'next/server';
import DataTreatment from "@/app/api/generate-json/data-treatment";
import GenerateData from "@/app/api/generate-json/generate-data";

const csvFilePath = 'public/data.csv';

export async function GET() {

    const league = ['WLDs'];
    const patchs = ['13.19'];
    const qualifyGames = [
        'ESPORTSTMNT06_2827798',
        'ESPORTSTMNT06_2828803',
        'ESPORTSTMNT06_2827812'
    ];

    if (fs.existsSync("public/data.json")) {
        const file = fs.readFileSync('public/data.json', {encoding: 'utf8'});
        const data = DataTreatment.generateDataToView(JSON.parse(file));

        return NextResponse.json(data);
    }

    let lastGameAdded: any = null;
    let championBans: any = {};
    let championPicks: any = {};
    let championDeathCount: any = {};
    let championWinRate: any = {};
    let championPicksDiffRoles: any = {};
    let drakesKilled: any = {};
    let pentaKillPlayers: any = {};
    let playerKDA: any = {};
    let playerMostKills: any = {};
    let playerDiffChampions: any = {};
    let playerFirstBlood: any = {};
    let teamFastGame: any = {};
    let teamLongGame: any = {};
    let teamDifferentChampions: any = {};
    let championBansGameTeamId: any = {};

    const json = await csvToJson().fromFile(csvFilePath);

    json.forEach(item => {

        if (league.includes(item.league) && patchs.includes(item.patch) && !qualifyGames.includes(item.gameid)) {

            if (item.position != 'team') {
                GenerateData.generateDataBans(championBansGameTeamId, item, championBans);
                GenerateData.generateDataPicks(item, championPicks);
                GenerateData.generateDataChampionDeaths(item, championDeathCount);
                GenerateData.generateDataChampionWinrate(item, championWinRate);
                GenerateData.generateDataPicksDifferentRoles(item, championPicksDiffRoles);
                GenerateData.generateDataPenta(item, pentaKillPlayers);
                GenerateData.generatePlayerKDA(item, playerKDA);
                GenerateData.generatePlayerMostKills(item, playerMostKills);
                GenerateData.generatePlayerDifferentChampions(item, playerDiffChampions);
                GenerateData.generateDataFirstBlood(item, playerFirstBlood);
                GenerateData.generateTeamDifferentChampions(item, teamDifferentChampions);
            } else {
                GenerateData.generateDataDrakes(item, drakesKilled);
                GenerateData.generateTeamFastGame(item, teamFastGame);
                GenerateData.generateTeamLongGame(item, teamLongGame);
                lastGameAdded = GenerateData.generateLastGameAdded(item, lastGameAdded);
            }

        }

    });

    const jsonSave = {
        lastGameAdded,
        championBans,
        championPicks,
        championWinRate,
        championPicksDiffRoles,
        championDeathCount,
        drakesKilled,
        pentaKillPlayers,
        playerKDA,
        playerMostKills,
        playerDiffChampions,
        playerFirstBlood,
        teamFastGame,
        teamLongGame,
        teamDifferentChampions
    }

    fs.writeFile("public/data.json", JSON.stringify(jsonSave), function (err) {
            if (err) throw err;
            console.log('complete');
        }
    );

    const data = DataTreatment.generateDataToView(jsonSave);

    return NextResponse.json(data);

}