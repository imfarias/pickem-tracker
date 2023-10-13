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
import {BsGithub, BsLinkedin, BsTwitch} from "react-icons/bs";
import {AiFillLinkedin} from "react-icons/ai";

export default async function Home() {

    let data: any = null;

    if (fs.existsSync("public/data.json")) {
        const file = fs.readFileSync('public/data.json', {encoding: 'utf8'});
        data = DataTreatment.generateDataToView(JSON.parse(file));

        const highestBan = data.championBans[0].info;
        data.championBans = data.championBans.filter((item: any) => item.info === highestBan);

        const highestPick = data.championPicks[0].info;
        data.championPicks = data.championPicks.filter((item: any) => item.info === highestPick);

        data.championWinRate = data.championWinRate.filter((item: any) => item.quantityMatches >= 5);
        const highestWinrate = data.championWinRate[0].winrate;
        data.championWinRate = data.championWinRate.filter((item: any) => item.winrate === highestWinrate);

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

        const playerKDA = data.playerKDA[0].ama;
        data.playerKDA = data.playerKDA.filter((item: any) => item.ama === playerKDA);

        const playerMostKills = data.playerMostKills[0].info;
        data.playerMostKills = data.playerMostKills.filter((item: any) => item.info === playerMostKills);

        const playerDiffChampions = data.playerDiffChampions[0].championQuantity;
        data.playerDiffChampions = data.playerDiffChampions.filter((item: any) => item.championQuantity === playerDiffChampions);

        const playerFirstBlood = data.playerFirstBlood[0].info;
        data.playerFirstBlood = data.playerFirstBlood.filter((item: any) => item.info === playerFirstBlood);

        const teamFastGame = data.teamFastGame[0].info;
        data.teamFastGame = data.teamFastGame.filter((item: any) => item.info === teamFastGame);

        const teamLongGame = data.teamLongGame[0].info;
        data.teamLongGame = data.teamLongGame.filter((item: any) => item.info === teamLongGame);

        const teamDifferentChampions = data.teamDifferentChampions[0].championQuantity;
        data.teamDifferentChampions = data.teamDifferentChampions.filter((item: any) => item.championQuantity === teamDifferentChampions);

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
                            <BsTwitch className="w-10 h-10"/>
                        </a>
                        <a href="https://www.linkedin.com/in/viniciusfbastos/" target="_blank">
                            <BsLinkedin className="w-10 h-10"/>
                        </a>
                    </div>

                    <section className="">
                        <div className="py-8 px-4 mx-autoclassNamew-screen-xl sm:py-16 lg:px-6">
                            <div className="max-w-screen-md mclassNameg:mb-16">
                                <h2 className="mb-4 text-4xl traclassName-tight font-extrabold text-gray-900 dark:text-cyan-500 font-bold">
                                    Acompanhe os dados do bolão do mundial
                                </h2>
                                <p className="text-gray-500 sm:classNamexl dark:text-gray-300">
                                    Fique por dentro dos dados que estão mais em destaque durante as partidas do Worlds
                                    2023.
                                </p>
                                <p className="text-gray-500 sm:classNamexl dark:text-cyan-200">
                                    Data da última atualização: {moment(data.lastGameAdded).format("DD/MM/YYYY")}
                                </p>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações do Evento
                            </h2>

                            <div className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">
                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiClockwork className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Qual será a
                                        duração da partida individual mais longa do Mundial?</h3>

                                    {data.teamLongGame.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Time: {item.name}</p>
                                                <p className="text-white text-lg">Duração da
                                                    Partida: {moment().startOf('day')
                                                        .seconds(item.info)
                                                        .format('HH:mm:ss')}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiSeaDragon className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Qual Dragão
                                        será mais abatido no Mundial?</h3>

                                    {data.drakesKilled.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Dragão: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade: {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações de Campeões
                            </h2>

                            <div className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiPoliceTarget className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Qual será o
                                        Campeão mais banido durante a Seleção de Campeões do Mundial?</h3>

                                    {data.championBans.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Campeão: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade: {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiArcheryTarget className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Qual será o
                                        Campeão mais escolhido durante a Seleção de Campeões do Mundial?</h3>

                                    {data.championPicks.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Campeão: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade: {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiRelationshipBounds className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Qual será o
                                        Campeão mais jogado em funções diferentes no Mundial?</h3>

                                    {data.championPicksDiffRoles.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Campeão: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade de
                                                    Roles: {item.quantityRoles}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiReaperScythe className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Quem terá a
                                        maior quantidade de mortes no Mundial?</h3>

                                    {data.championDeathCount.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Campeão: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade de Mortes: {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiCrenelCrown className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Quem terá a
                                        maior taxa de vitórias no Mundial? (Mínimo de 5 partidas jogadas)</h3>

                                    {data.championWinRate.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Campeão: {item.name}</p>
                                                <p className="text-white text-lg">Porcentagem de
                                                    winrate: {item.winrate.toFixed(2)}%</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações de Jogadores
                            </h2>

                            <div className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiMultipleTargets className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">Quem jogará
                                        com mais Campeões diferentes no Mundial?</h3>

                                    {data.playerDiffChampions.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Jogador: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade de Picks
                                                    Diferentes: {item.championQuantity}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiDeathNote className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">
                                        Quem conseguirá a maior quantidade de abates em uma única partida no Mundial?
                                    </h3>

                                    {data.playerMostKills.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Jogador: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade de Kills: {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiRank3 className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">
                                        Quem terá o maior AMA do Mundial?
                                    </h3>

                                    {data.playerKDA.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Jogador: {item.name}</p>
                                                <p className="text-white text-lg">AMA: {item.ama.toFixed(2)}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiSkullCrack className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">
                                        Quem conseguirá a maior quantidade de First Bloods no Mundial?
                                    </h3>

                                    {data.playerFirstBlood.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Jogador: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade de
                                                    FirstBloods: {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiSkullShield className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">
                                        Quem conseguirá pelo menos um Penta Kill no Mundial?
                                    </h3>

                                    {data.pentaKillPlayers.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Jogador: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade de Penta
                                                    Kills: {item.info}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <h2 className="mt-8 text-2xl traclassName-tight font-extrabold text-cyan-300">
                                Informações de Equipes
                            </h2>

                            <div className="px-3 grid-cols-1 md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-5 grid mt-10 gap-6">

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiTimeBomb className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">
                                        Que equipe sairá vitoriosa da partida mais curta do Mundial?
                                    </h3>

                                    {data.teamFastGame.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Time: {item.name}</p>
                                                <p className="text-white text-lg">Duração da
                                                    Partida: {moment().startOf('day')
                                                        .seconds(item.info)
                                                        .format('HH:mm:ss')}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="border-2 border-gray-500 p-4 bg-gray-900">
                                    <div
                                        className="flex justify-centclassNameems-center mb-3 w-14 h-14 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <GiThreeFriends className="w-14 h-14 text-primary-300"/>
                                    </div>
                                    <h3 className="mb-2 text-xl fontclassName dark:text-cyan-500 font-bold">
                                        Que equipe jogará com mais Campeões diferentes em Mundial?
                                    </h3>

                                    {data.teamDifferentChampions.map((item: any, index: any) => {
                                        return (
                                            <div key={index} className="last:border-0 border-b-2 border-gray-500 py-3">
                                                <p className="text-white text-lg">Time: {item.name}</p>
                                                <p className="text-white text-lg">Quantidade de Picks
                                                    Diferentes: {item.championQuantity}</p>
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
