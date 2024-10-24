import { AxiosResponse } from "axios";
import { api } from "../../api/axios.js";
import { TeamOptions, TeamProperties } from "../../types/types.js";
import { ClickUpClientError } from "../../errors/ClickUpClientError.js";

/**
 * Retrieves a list of teams based on the filters provided in the options object. If no options are provided, all teams are retrieved.
 *
 * @param {TeamOptions} options - An optional object containing filters for the teams you want to retrieve
 * @returns {Promise<TeamProperties[]>} A promise that resolves to an array of team objects with their properties
 */
export async function getTeams(
    options?: TeamOptions
): Promise<TeamProperties[]> {
    try {
        if (options && options.teamId) return await getTeamById(options);

        return await getTeamByOptions(options);
    } catch (error: any) {
        throw new ClickUpClientError(error);
    }
}

async function getTeamById(options: TeamOptions): Promise<TeamProperties[]> {
    const response: AxiosResponse<{ team: TeamProperties }> = await api.get(
        `/v2/team/${options.teamId}`
    );

    const spaces = [response.data.team as TeamProperties];

    return spaces;
}

async function getTeamByOptions(
    options?: TeamOptions
): Promise<TeamProperties[]> {
    const response: AxiosResponse<{ teams: TeamProperties[] }> = await api.get(
        "/v2/team"
    );

    const teams = response.data.teams as TeamProperties[];

    if (teams.length === 0) {
        throw new Error("GET_TEAM: Team not found");
    }

    if (!options) return teams;
    if (options.name) return filterTeamsByName(teams, options);

    throw new Error("GET_TEAM: Invalid options provided");
}

function filterTeamsByName(teams: TeamProperties[], options: TeamOptions) {
    const filteredTeams = teams.filter((team) => team.name === options.name);
    if (filteredTeams.length === 0) {
        throw new Error("GET_TEAM: Team not found");
    }
    return filteredTeams;
}
