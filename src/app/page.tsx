import fs from "fs";
import DataTreatment from "@/app/api/generate-json/data-treatment";
import Image from "next/image";
import moment from "moment";
import {
    GiArcheryTarget,
    GiClockwork,
    GiCrenelCrown,
    GiDeathNote,
    GiMultipleTargets,
    GiPoliceTarget,
    GiRank3,
    GiReaperScythe,
    GiRelationshipBounds,
    GiSeaDragon,
    GiSkullCrack,
    GiSkullShield,
    GiThreeFriends,
    GiTimeBomb
} from "react-icons/gi";
import {BsLinkedin, BsTwitch} from "react-icons/bs";

export default async function Home() {

    let data: any = null;

    if (fs.existsSync("public/data.json")) {
        const file = fs.readFileSync('public/data.json', {encoding: 'utf8'});
        data = DataTreatment.generateDataToView(JSON.parse(file));

        let firstBan = data.championBans[0].info;
        let championBansList = data.championBans;
        data.championBans = championBansList.filter((item: any) => item.info === firstBan);
        let anotherChampionBansList = championBansList.filter((item: any) => item.info !== firstBan);
        let secondBan = anotherChampionBansList[0].info;
        data.championBans = [...data.championBans, ...anotherChampionBansList.filter((item: any) => item.info === secondBan && item.info != firstBan)]
        anotherChampionBansList = championBansList.filter((item: any) => item.info !== firstBan && item.info !== secondBan);
        let thirdBan = anotherChampionBansList[0].info;
        data.championBans = [...data.championBans, ...anotherChampionBansList.filter((item: any) => item.info === thirdBan && item.info != firstBan && item.info != secondBan)]

        let firstPick = data.championPicks[0].info;
        let championPicksList = data.championPicks;
        data.championPicks = championPicksList.filter((item: any) => item.info === firstPick);
        let anotherChampionPicksList = championPicksList.filter((item: any) => item.info !== firstPick);
        let secondPick = anotherChampionPicksList[0].info;
        data.championPicks = [...data.championPicks, ...anotherChampionPicksList.filter((item: any) => item.info === secondPick && item.info != firstPick)]
        anotherChampionPicksList = championPicksList.filter((item: any) => item.info !== firstPick && item.info !== secondPick);
        let thirdPick = anotherChampionPicksList[0].info;
        data.championPicks = [...data.championPicks, ...anotherChampionPicksList.filter((item: any) => item.info === thirdPick && item.info != firstPick && item.info != secondPick)]

        let championWinRatesList = data.championWinRate.filter((item: any) => item.quantityMatches >= 5);
        let firstWinRate = championWinRatesList[0].winrate;

        data.championWinRate = championWinRatesList.filter((item: any) => item.winrate === firstWinRate);
        let anotherChampionWinRatesList = championWinRatesList.filter((item: any) => item.winrate !== firstWinRate);
        let secondWinRate = anotherChampionWinRatesList[0].winrate;
        data.championWinRate = [...data.championWinRate, ...anotherChampionWinRatesList.filter((item: any) => item.winrate === secondWinRate && item.winrate != firstWinRate)]
        anotherChampionWinRatesList = championWinRatesList.filter((item: any) => item.winrate !== firstWinRate && item.winrate !== secondWinRate);
        let thirdWinRate = anotherChampionWinRatesList[0].winrate;
        data.championWinRate = [...data.championWinRate, ...anotherChampionWinRatesList.filter((item: any) => item.winrate === thirdWinRate && item.winrate != firstWinRate && item.winrate != secondWinRate)]

        const quantityRoles = data.championPicksDiffRoles[0].quantityRoles;
        data.championPicksDiffRoles = data.championPicksDiffRoles.filter((item: any) => item.quantityRoles === quantityRoles);

        const quantityDeaths = data.championDeathCount[0].info;
        data.championDeathCount = data.championDeathCount.filter((item: any) => item.info === quantityDeaths);

        const drakesKilled = data.drakesKilled[0].info;
        data.drakesKilled = data.drakesKilled.filter((item: any) => item.info === drakesKilled).map(
            (item: any) => {
                switch (item.name) {
                    case 'clouds':
                        item.name = 'Núvens';
                        break;
                    case 'infernals':
                        item.name = 'Infernal';
                        break;
                    case 'mountains':
                        item.name = 'Montanha';
                        break;
                    case 'oceans':
                        item.name = 'Oceano';
                        break;
                    case 'chemtechs':
                        item.name = 'Quimtec';
                        break;
                    case 'hextechs':
                        item.name = 'Hextec';
                        break;
                }

                return item;
            }
        );

        let firstKDA = data.playerKDA[0].ama;
        let playerKDAList = data.playerKDA;
        data.playerKDA = playerKDAList.filter((item: any) => item.ama === firstKDA);
        let anotherKDA = playerKDAList.filter((item: any) => item.ama !== firstKDA);
        let secondKDA = anotherKDA[0].ama
        data.playerKDA = [...data.playerKDA, ...anotherKDA.filter((item: any) => item.ama === secondKDA && item.ama != firstKDA)]
        anotherKDA = playerKDAList.filter((item: any) => item.ama !== firstKDA && item.ama !== secondKDA);
        let thirdKDA = anotherKDA[0].ama
        data.playerKDA = [...data.playerKDA, ...anotherKDA.filter((item: any) => item.ama === thirdKDA && item.ama != firstKDA && item.ama != secondKDA)]

        let firstMostKill = data.playerMostKills[0].info;
        let playerMostKillList = data.playerMostKills;
        data.playerMostKills = playerMostKillList.filter((item: any) => item.info === firstMostKill);
        let anotherMostKill = playerMostKillList.filter((item: any) => item.info !== firstMostKill);
        let secondMostKill = anotherMostKill[0].info
        data.playerMostKills = [...data.playerMostKills, ...anotherMostKill.filter((item: any) => item.info === secondMostKill && item.info != firstMostKill)]
        anotherMostKill = playerMostKillList.filter((item: any) => item.info !== firstMostKill && item.info !== secondMostKill);
        let thirdMostKill = anotherMostKill[0].info
        data.playerMostKills = [...data.playerMostKills, ...anotherMostKill.filter((item: any) => item.info === thirdMostKill && item.info != firstMostKill && item.info != secondMostKill)]

        let firstPlayerQuantity = data.playerDiffChampions[0].championQuantity;
        let playerDiffChampionList = data.playerDiffChampions;
        data.playerDiffChampions = playerDiffChampionList.filter((item: any) => item.championQuantity === firstPlayerQuantity);
        let anotherPlayerChampionDiffList = playerDiffChampionList.filter((item: any) => item.championQuantity !== firstPlayerQuantity);
        let secondPlayerQuantity = anotherPlayerChampionDiffList[0].championQuantity;
        data.playerDiffChampions = [...data.playerDiffChampions, ...anotherPlayerChampionDiffList.filter((item: any) => item.championQuantity === secondPlayerQuantity && item.championQuantity != firstPlayerQuantity)]
        anotherPlayerChampionDiffList = playerDiffChampionList.filter((item: any) => item.championQuantity !== firstPlayerQuantity && item.championQuantity !== secondPlayerQuantity);
        let thirdPlayerQuantity = anotherPlayerChampionDiffList[0].championQuantity;
        data.playerDiffChampions = [...data.playerDiffChampions, ...anotherPlayerChampionDiffList.filter((item: any) => item.championQuantity === thirdPlayerQuantity && item.championQuantity != firstPlayerQuantity && item.championQuantity != secondPlayerQuantity)]

        let firstPlayerFirstBlood = data.playerFirstBlood[0].info;
        let playerFirstBloodList = data.playerFirstBlood;
        data.playerFirstBlood = playerFirstBloodList.filter((item: any) => item.info === firstPlayerFirstBlood);
        let anotherPlayerFirstBloodList = playerFirstBloodList.filter((item: any) => item.info !== firstPlayerFirstBlood);
        let secondPlayerFirstBlood = anotherPlayerFirstBloodList[0].info;
        data.playerFirstBlood = [...data.playerFirstBlood, ...anotherPlayerFirstBloodList.filter((item: any) => item.info === secondPlayerFirstBlood && item.info != firstPlayerFirstBlood)]
        anotherPlayerFirstBloodList = playerFirstBloodList.filter((item: any) => item.info !== firstPlayerFirstBlood && item.info !== secondPlayerFirstBlood);

        if (anotherPlayerFirstBloodList.length) {
            let thirdPlayerFirstBlood = anotherPlayerFirstBloodList[0].info;
            data.playerFirstBlood = [...data.playerFirstBlood, ...anotherPlayerFirstBloodList.filter((item: any) => item.info === thirdPlayerFirstBlood && item.info != firstPlayerFirstBlood && item.info != secondPlayerFirstBlood)]
        }

        const teamFastGame = data.teamFastGame[0].info;
        data.teamFastGame = data.teamFastGame.filter((item: any) => item.info === teamFastGame);

        const teamLongGame = data.teamLongGame[0].info;
        data.teamLongGame = data.teamLongGame.filter((item: any) => item.info === teamLongGame);



        let firstTeamQuantity = data.teamDifferentChampions[0].championQuantity;
        let teamDiffChampList = data.teamDifferentChampions;
        data.teamDifferentChampions = teamDiffChampList.filter((item: any) => item.championQuantity === firstTeamQuantity);
        let anotherTeamDiffChampList = teamDiffChampList.filter((item: any) => item.championQuantity !== firstTeamQuantity);
        let secondTeamQuantity = anotherTeamDiffChampList[0].championQuantity;
        data.teamDifferentChampions = [...data.teamDifferentChampions, ...anotherTeamDiffChampList.filter((item: any) => item.championQuantity === secondTeamQuantity && item.championQuantity != firstTeamQuantity)]
        anotherTeamDiffChampList = teamDiffChampList.filter((item: any) => item.championQuantity !== firstTeamQuantity && item.championQuantity !== secondTeamQuantity);
        let thirdTeamQuantity = anotherTeamDiffChampList[0].championQuantity;
        data.teamDifferentChampions = [...data.teamDifferentChampions, ...anotherTeamDiffChampList.filter((item: any) => item.championQuantity === thirdTeamQuantity && item.championQuantity != firstTeamQuantity && item.championQuantity != secondTeamQuantity)]

    }

    return (
        <>
            {data ?
                <>
                    <div className="flex justify-center">
                        <a href="https://www.twitch.tv/arcanto" target="_blank">
                            <Image className="w-96 mt-5 mb-5 block" src={'/logo.png'} alt={'logo'} width={663}
                                   height={153}/>
                        </a>
                    </div>

                    <div className="flex justify-center gap-5">
                        <a href="https://www.twitch.tv/arcanto" target="_blank">
                            <BsTwitch className="w-10 h-10 text-white hover:text-cyan-500 transition-all"/>
                        </a>
                        <a href="https://www.linkedin.com/in/viniciusfbastos/" target="_blank">
                            <BsLinkedin className="w-10 h-10 text-white hover:text-cyan-500 transition-all"/>
                        </a>
                    </div>

                    <section className="">
                        <div className="py-8 px-4 mx-autoclassNamew-screen-xl sm:py-16 lg:px-6">
                            <div className="max-w-screen-md mclassNameg:mb-16">
                                <h2 className="mb-4 text-4xl traclassName-tight text-cyan-500 font-bold">
                                    Acompanhe os dados do bolão do mundial
                                </h2>
                                <p className="text-gray-300 sm:classNamexl">
                                    Fique por dentro dos dados que estão mais em destaque durante as partidas do Worlds
                                    2023.
                                </p>
                                <p className="text-gray-400 sm:classNamexl">
                                    Algumas seleções do bolão possuem 1º, 2º e 3º lugar, exemplo: (Qual será o Campeão mais escolhido durante a Seleção de Campeões do Mundial?), essas seleções possuem um ícone ao lado da pontuação no site do lolesports.
                                </p>
                                <p className="sm:classNamexl text-cyan-200">
                                    Data da última atualização: {moment(data.lastGameAdded).format("DD/MM/YYYY")}
                                </p>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações do Evento
                            </h2>

                            <div
                                className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">
                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiClockwork className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Qual será a
                                        duração da partida individual mais longa do Mundial?</h3>

                                    {data.teamLongGame.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Time:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Duração da
                                                    Partida:</span> {moment().startOf('day')
                                                    .seconds(item.info)
                                                    .format('HH:mm:ss')}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiSeaDragon className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Qual Dragão
                                        será mais abatido no Mundial?</h3>

                                    {data.drakesKilled.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Dragão:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade:</span> {item.info}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações de Campeões
                            </h2>

                            <div
                                className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiRelationshipBounds className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Qual será o
                                        Campeão mais jogado em funções diferentes no Mundial?</h3>

                                    {data.championPicksDiffRoles.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Campeão:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade de
                                                    Roles:</span> {item.quantityRoles}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiArcheryTarget className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Qual será o
                                        Campeão mais escolhido durante a Seleção de Campeões do Mundial?</h3>

                                    {data.championPicks.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Campeão:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade:</span> {item.info}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiPoliceTarget className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Qual será o
                                        Campeão mais banido durante a Seleção de Campeões do Mundial?</h3>

                                    {data.championBans.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Campeão:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade:</span> {item.info}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiReaperScythe className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Quem terá a
                                        maior quantidade de mortes no Mundial?</h3>

                                    {data.championDeathCount.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Campeão:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade de Mortes:</span> {item.info}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiCrenelCrown className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Quem terá a
                                        maior taxa de vitórias no Mundial? (Mínimo de 5 partidas jogadas)</h3>

                                    {data.championWinRate.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Campeão:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Porcentagem de
                                                    winrate:</span> {item.winrate.toFixed(2)}%</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações de Jogadores
                            </h2>

                            <div
                                className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiMultipleTargets className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">Quem jogará
                                        com mais Campeões diferentes no Mundial?</h3>

                                    {data.playerDiffChampions.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500"><span
                                                    className="font-bold text-cyan-500">Jogador:</span></span> {item.name}
                                                </p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade de Picks
                                                    Diferentes:</span> {item.championQuantity}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiDeathNote className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">
                                        Quem conseguirá a maior quantidade de abates em uma única partida no Mundial?
                                    </h3>

                                    {data.playerMostKills.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Jogador:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade de Kills:</span> {item.info}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiRank3 className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">
                                        Quem terá o maior AMA do Mundial?
                                    </h3>

                                    {data.playerKDA.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Jogador:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">AMA:</span> {item.ama.toFixed(2)}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiSkullCrack className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">
                                        Quem conseguirá a maior quantidade de First Bloods no Mundial?
                                    </h3>

                                    {data.playerFirstBlood.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Jogador:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade de
                                                    FirstBloods:</span> {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiSkullShield className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">
                                        Quem conseguirá pelo menos um Penta Kill no Mundial?
                                    </h3>

                                    {data.pentaKillPlayers.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Jogador:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade de Penta
                                                    Kills:</span> {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações de Equipes
                            </h2>

                            <div
                                className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiTimeBomb className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">
                                        Que equipe sairá vitoriosa da partida mais curta do Mundial?
                                    </h3>

                                    {data.teamFastGame.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Time:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Duração da
                                                    Partida:</span> {moment().startOf('day')
                                                    .seconds(item.info)
                                                    .format('HH:mm:ss')}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div
                                    className="border-2 border-gray-500 p-4 bg-gray-900 hover:bg-gray-700 transition-all max-h-128 overflow-y-auto">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiThreeFriends className="w-14 h-14 text-white"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName text-cyan-500 font-bold">
                                        Que equipe jogará com mais Campeões diferentes em Mundial?
                                    </h3>

                                    {data.teamDifferentChampions.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Time:</span> {item.name}</p>
                                                <p className="text-white text-lg"><span
                                                    className="font-bold text-cyan-500">Quantidade de Picks
                                                    Diferentes:</span> {item.championQuantity}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                        </div>
                    </section>
                </>
                : <p>Não foram encontrados registros</p>}
        </>
    )
}
