export default class DataTreatment {

    public static sortData(dataList: any) {
        const dataSorted: any = Object.entries(dataList).map(([name, info]) => ({name, info}));

        dataSorted.sort((a: any, b: any) => b.info - a.info);

        return dataSorted;
    }

    public static sortDataInversed(dataList: any) {
        const dataSorted: any = Object.entries(dataList).map(([name, info]) => ({name, info}));

        dataSorted.sort((a: any, b: any) => a.info - b.info);

        return dataSorted;
    }

    public static sortMorePicksData(dataList: any) {

        const dataArray = Object.entries(dataList);

        dataArray.sort((a, b) => {
            const aName: any = a[0];
            const aRoles: any = a[1];
            const bName: any = b[0];
            const bRoles: any = b[1];

            // Sort first by the number of roles
            const aRolesCount = Object.keys(aRoles).length;
            const bRolesCount = Object.keys(bRoles).length;
            if (aRolesCount !== bRolesCount) {
                return bRolesCount - aRolesCount;
            }

            const aMatches: any = Object.values(aRoles).reduce((total: any, value: any) => total + value, 0);
            const bMatches: any = Object.values(bRoles).reduce((total: any, value: any) => total + value, 0);
            return bMatches - aMatches;
        });

        for (const champion in dataList) {
            dataList[champion].name = champion;
        }


        return Object.values(Object.fromEntries(dataArray));

    }

    public static sortDataWinrate(dataList: any) {

        for (const champion in dataList) {
            const wins = dataList[champion].wins;
            const loses = dataList[champion].loses;
            dataList[champion].winrate = ((wins / (wins + loses)) * 100);
            dataList[champion].quantityMatches = wins + loses;
            dataList[champion].name = champion;
        }

        const dataArray = Object.entries(dataList);

        dataArray.sort((a: any, b: any) => b[1].winrate - a[1].winrate);

        return Object.values(Object.fromEntries(dataArray));

    }

    public static sortPlayerKDA(dataList: any) {

        for (const player in dataList) {
            const kills = dataList[player].kills;
            const deaths = dataList[player].deaths;
            const assists = dataList[player].assists;

            dataList[player].ama = (kills + assists / deaths);
            dataList[player].name = player;
        }

        const dataArray = Object.entries(dataList);

        dataArray.sort((a: any, b: any) => b[1].ama - a[1].ama);

        return Object.values(Object.fromEntries(dataArray));

    }

    public static sortPlayerDiffPicks(dataList: any) {

        const dataArray = Object.entries(dataList);

        dataArray.sort((a: any, b: any) => b[1].length - a[1].length);

        const data: any = [];

        dataArray.forEach((value: any) => {
            data.push({
                name: value[0],
                champions: value[1],
                championQuantity: value[1].length
            })
        });

        return data;

    }

    public static generateDataToView(data: any) {

        data.championBans = this.sortData(data.championBans);
        data.championPicks = this.sortData(data.championPicks);
        data.drakesKilled = this.sortData(data.drakesKilled);
        data.pentaKillPlayers = this.sortData(data.pentaKillPlayers);
        data.championPicksDiffRoles = this.sortMorePicksData(data.championPicksDiffRoles);
        data.championDeathCount = this.sortData(data.championDeathCount);
        data.championWinRate = this.sortDataWinrate(data.championWinRate);
        data.playerKDA = this.sortPlayerKDA(data.playerKDA);
        data.playerMostKills = this.sortData(data.playerMostKills);
        data.playerDiffChampions = this.sortPlayerDiffPicks(data.playerDiffChampions);
        data.teamDifferentChampions = this.sortPlayerDiffPicks(data.teamDifferentChampions);
        data.playerFirstBlood = this.sortData(data.playerFirstBlood);
        data.teamFastGame = this.sortDataInversed(data.teamFastGame);
        data.teamLongGame = this.sortData(data.teamLongGame);

        return data;
    }

}