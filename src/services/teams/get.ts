import { AxiosResponse } from "axios";
import { api } from "../../api/axios.js";
import { TeamOptions, TeamProperties } from "../../types/types.js";
import { ClickUpClientError } from "../../errors/ClickUpClientError.js";

/**
 * Retrieves a list of teams based on the filters provided in the options object. If no options are provided, all teams are retrieved.
 *
 * @param {TeamOptions} options - An optional object containing filters for the teams you want to retrieve
 * @returns {Promise<TeamProperties[]>} - A promise that resolves to an array of team objects with their properties
 */
export async function get(options?: TeamOptions): Promise<TeamProperties[]> {
    try {
        if (!options || options.name) {
            const response: AxiosResponse<{ teams: TeamProperties[] }> =
                await api.get("/v2/team");

            if (!options) return response.data.teams as TeamProperties[];
            if (options.name)
                return (response.data.teams as TeamProperties[]).filter(
                    (team) => team.name === options.name
                );
        } else if (options.teamId) {
            const response: AxiosResponse<{ team: TeamProperties }> =
                await api.get(`/v2/team/${options.teamId}`);

            if (options.teamId) return [response.data.team as TeamProperties];
        }

        throw new Error("GET_TEAM: Invalid options provided");
    } catch (error: any) {
        throw new ClickUpClientError(error);
    }
}