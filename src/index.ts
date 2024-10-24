import { getSpaces } from "./services/spaces/getSpaces.js";
import { getTeams } from "./services/teams/getTeams.js";

const teams = {
    get: getTeams,
};

const spaces = {
    get: getSpaces,
};

export { teams, spaces };
