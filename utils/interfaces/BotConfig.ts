import Discord from 'discord.js';

export default interface BotConfig {
    DISCORD_TOKEN: string,
    ROBLOX_COOKIE: string,
    ROBLOX_API_KEY: string,
    ROVER_API_KEY: string,
    groupId: number,
    permissions: {
        all: string[],
        group: {
            shout: string[],
            ranking: string[],
            joinrequests: string[],
            user: string[],
        },
        game: {
            general: string[]
            broadcast: string[],
            kick: string[],
            ban: string[],
            shutdown: string[],
            datastore: string[],
            execution: string[],
            jobIDs: string[],
            lock: string[],
            mute: string[]
        }
    },
    logging: {
        audit: {
            enabled: boolean,
            loggingChannel: string
        },
        shout: {
            enabled: boolean,
            loggingChannel: string
        },
        command: {
            enabled: boolean,
            loggingChannel: string
        }
    }
    embedColors: {
        info: Discord.ColorResolvable,
        success: Discord.ColorResolvable,
        error: Discord.ColorResolvable
    },
    universeId: number,
    datastoreName: string,
    verificationChecks: boolean,
    collectorTime: number,
    maximumNumberOfUsers: number,
    lockedRanks: any[],
    lockedCommands: string[],
    whitelistedServers: string[]
}