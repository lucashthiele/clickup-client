import { AxiosResponse } from "axios";
import {
    SpaceOptions,
    SpaceProperties,
    SpaceTaskStatus,
    TeamOptions,
    TeamProperties,
} from "../../types/types.js";
import { api } from "../../api/axios.js";
import { ClickUpClientError } from "../../errors/ClickUpClientError.js";
import { getTeams } from "../teams/getTeams.js";

type SpaceResponse = {
    id: string;
    name: string;
    statuses: {
        id: string;
        status: string;
        type: string;
        orderindex: number;
    }[];
    archived: boolean;
};

/**
 * Retrieves a list of spaces based on the filters provided in the options object.
 * If no options are provided, all spaces from all teams are retrieved.
 *
 * @param {SpaceOptions} options - An optional object containing filters for the spaces you want to retrieve
 * @returns {Promise<SpaceProperties[]>} A promise that resolves to an array of spaces objects with their properties
 */
export async function getSpaces(
    options?: SpaceOptions
): Promise<SpaceProperties[]> {
    try {
        validateOptions(options);

        if (options && options.spaceId) return await getSpaceById(options);

        return await getSpaceByOptions(options);
    } catch (error: any) {
        throw new ClickUpClientError(error);
    }
}

async function getTeamId(options?: SpaceOptions) {
    let teamId: string = options?.teamId || "";

    if (!teamId) {
        const teamOptions: TeamOptions | undefined = options?.teamName
            ? { name: options.teamName }
            : undefined;
        const teams: TeamProperties[] = await getTeams(teamOptions);
        teamId = teams[0].id;
    }

    if (teamId) {
        const teamOptions: TeamOptions = { teamId: teamId };
        const teams: TeamProperties[] = await getTeams(teamOptions);
        if (teams.length === 0)
            throw new ClickUpClientError("GET_SPACE: Team not found");
    }
    return teamId;
}

async function getSpaceById(options: SpaceOptions) {
    const response: AxiosResponse<SpaceResponse> = await api.get(
        `/v2/space/${options.spaceId}`
    );

    const spaces: SpaceProperties[] = [responseToProperties(response.data)];

    return spaces;
}

async function getSpaceByOptions(
    options?: SpaceOptions
): Promise<SpaceProperties[]> {
    const teamId: string = await getTeamId(options);

    const response: AxiosResponse<{ spaces: SpaceResponse[] }> = await api.get(
        `/v2/team/${teamId}/space`
    );

    const spaces: SpaceProperties[] = [];

    response.data.spaces.forEach((space) => {
        if (!(options && options.name && space.name !== options.name))
            spaces.push({ ...responseToProperties(space), teamId });
    });

    if (spaces.length === 0) throw new Error("GET_SPACE: Space not found");

    return spaces;
}

function responseToProperties(response: SpaceResponse): SpaceProperties {
    const statuses: SpaceTaskStatus[] = [];

    response.statuses.forEach((status) => {
        statuses.push({
            id: status.id,
            status: status.status,
            orderIndex: status.orderindex,
            type: status.type,
        });
    });

    return {
        id: response.id,
        name: response.name,
        statuses: statuses,
        isArchived: response.archived,
    };
}

function validateOptions(options?: SpaceOptions) {
    if (!options) return;

    if (options.spaceId) return;
    if (options.name) return;
    if (options.teamName) return;
    if (options.teamId) return;

    throw new Error("GET_SPACE: Invalid options provided");
}
