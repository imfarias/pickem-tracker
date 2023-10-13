export default class GenerateData {


    public static addBanItem(dataList: any, champion: string) {
        if (dataList[champion]) {
            dataList[champion] += 1;
        } else {
            dataList[champion] = 1;
        }
    }

    public static generateDataBans(championBansGameTeamId: any, item: any, dataList: any) {
        if (!championBansGameTeamId[item.gameid]) {
            championBansGameTeamId[item.gameid] = [];
        }

        if (!championBansGameTeamId[item.gameid].includes(item.teamid)) {
            this.addBanItem(dataList, item.ban1);
            this.addBanItem(dataList, item.ban2);
            this.addBanItem(dataList, item.ban3);
            this.addBanItem(dataList, item.ban4);
            this.addBanItem(dataList, item.ban5);

            championBansGameTeamId[item.gameid].push(item.teamid);
        }
    }

    public static generateDataPicks(item: any, dataList: any) {
        if (!dataList[item.champion]) {
            dataList[item.champion] = 1;
        } else {
            dataList[item.champion] += 1;
        }
    }

    public static generateDataChampionDeaths(item: any, dataList: any) {
        if (!dataList[item.champion]) {
            dataList[item.champion] = parseInt(item.deaths);
        } else {
            dataList[item.champion] += parseInt(item.deaths);
        }
    }

    public static generateDataChampionWinrate(item: any, dataList: any) {
        if (!dataList[item.champion]) {
            dataList[item.champion] = {
                wins: 0,
                loses: 0,
            };

            if (item.result == 1) {
                dataList[item.champion].wins = 1;
            } else {
                dataList[item.champion].loses = 1;
            }

        } else {

            if (item.result == 1) {
                dataList[item.champion].wins += 1;
            } else {
                dataList[item.champion].loses += 1;
            }

        }
    }

    public static generateDataPicksDifferentRoles(item: any, dataList: any) {
        if (!dataList[item.champion]) {
            dataList[item.champion] = {};
            dataList[item.champion][item.position] = 1;
            dataList[item.champion]['quantityRoles'] = 1;
        } else if (!dataList[item.champion][item.position]) {
            dataList[item.champion][item.position] = 1;
            dataList[item.champion]['quantityRoles'] += 1;
        } else {
            dataList[item.champion][item.position] += 1;
        }
    }

    public static generateDataPenta(item: any, dataList: any) {
        const namePlayer = `${item.playername} - ${item.teamname}`;
        const pentaKills = parseInt(item.pentakills);

        if (pentaKills > 0) {
            if (!dataList[namePlayer]) {
                dataList[namePlayer] = parseInt(item.pentakills);
            } else {
                dataList[namePlayer] += parseInt(item.pentakills);
            }
        }
    }

    public static generateDataFirstBlood(item: any, dataList: any) {
        const namePlayer = `${item.playername} - ${item.teamname}`;
        const firstbloodkill = parseInt(item.firstbloodkill);

        if (firstbloodkill > 0) {
            if (!dataList[namePlayer]) {
                dataList[namePlayer] = parseInt(item.firstbloodkill);
            } else {
                dataList[namePlayer] += parseInt(item.firstbloodkill);
            }
        }
    }

    public static generateTeamFastGame(item: any, dataList: any) {
        const gamelength = parseInt(item.gamelength);

        if ((!dataList[item.teamname] || dataList[item.teamname] > gamelength) && parseInt(item.result) === 1) {
            dataList[item.teamname] = gamelength;
        }
    }

    public static generateTeamLongGame(item: any, dataList: any) {
        const gamelength = parseInt(item.gamelength);

        if ((!dataList[item.teamname] || dataList[item.teamname] < gamelength) && parseInt(item.result) === 1) {
            dataList[item.teamname] = gamelength;
        }
    }

    public static generateLastGameAdded(item: any, dataList: Date) {

        if (!dataList || dataList < new Date(item.date)) {
            dataList = new Date(item.date);
        }

        return dataList;

    }

    public static generatePlayerKDA(item: any, dataList: any) {
        const namePlayer = `${item.playername} - ${item.teamname}`;
        const kills = parseInt(item.kills);
        const deaths = parseInt(item.deaths);
        const assists = parseInt(item.assists);

        if (!dataList[namePlayer]) {
            dataList[namePlayer] = {
                kills,
                deaths,
                assists
            };
        } else {
            dataList[namePlayer].kills += kills;
            dataList[namePlayer].deaths += deaths;
            dataList[namePlayer].assists += assists;
        }
    }

    public static generatePlayerMostKills(item: any, dataList: any) {
        const namePlayer = `${item.playername} - ${item.teamname}`;
        const kills = parseInt(item.kills);

        if (!dataList[namePlayer] || dataList[namePlayer] < kills) {
            dataList[namePlayer] = kills;
        }

    }

    public static generatePlayerDifferentChampions(item: any, dataList: any) {
        const namePlayer = `${item.playername} - ${item.teamname}`;

        if (!dataList[namePlayer]) {
            dataList[namePlayer] = [];
        }

        if(!dataList[namePlayer].includes(item.champion)) {
            dataList[namePlayer].push(item.champion);
        }

    }

    public static generateTeamDifferentChampions(item: any, dataList: any) {
        const namePlayer = `${item.teamname}`;

        if (!dataList[namePlayer]) {
            dataList[namePlayer] = [];
        }

        if(!dataList[namePlayer].includes(item.champion)) {
            dataList[namePlayer].push(item.champion);
        }

    }

    public static generateDataForDrake(dataList: any, drake: string, quantity: any) {
        if (!dataList[drake]) {
            dataList[drake] = parseInt(quantity);
        } else {
            dataList[drake] += parseInt(quantity);
        }
    }

    public static generateDataDrakes(item: any, dataList: any) {
        this.generateDataForDrake(dataList, 'infernals', item.infernals);
        this.generateDataForDrake(dataList, 'mountains', item.mountains);
        this.generateDataForDrake(dataList, 'clouds', item.clouds);
        this.generateDataForDrake(dataList, 'oceans', item.oceans);
        this.generateDataForDrake(dataList, 'chemtechs', item.chemtechs);
        this.generateDataForDrake(dataList, 'hextechs', item.hextechs);
    }

}