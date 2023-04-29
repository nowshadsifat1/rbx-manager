import Discord from 'discord.js';
import roblox = require('noblox.js');

import config from '../../config';

export default class GroupHandler {
    private static groupData: {id: number, name: string}[] = [];
    private static async loadGroupNames() {
        if(this.groupData.length === 0) {
            for(let i = 0; i < config.groupIds.length; i++) {
                let groupInfo = await roblox.getGroup(config.groupIds[i]);
                this.groupData.push({id: groupInfo.id, name: groupInfo.name});
            }
        }
    }
    public static parseGroups(): Discord.APIApplicationCommandOptionChoice[] {
        this.loadGroupNames().then(() => {
            let parsed: Discord.APIApplicationCommandOptionChoice[] = [];
            for(let i = 0; i < this.groupData.length; i++) {
                parsed.push({name: this.groupData[i].name, value: this.groupData[i].name});
            }
            return parsed;
        });
        return [];
    }
    public static getNameFromID(groupID: number): string {
        return this.groupData.find(v => v.id === groupID).name;
    }
    public static getIDFromName(groupName: string): number {
        return this.groupData.find(v => v.name === groupName).id;
    }
}