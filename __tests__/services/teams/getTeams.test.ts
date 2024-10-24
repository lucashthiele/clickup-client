import { getTeams } from "../../../src/services/teams/getTeams.js";
import { TeamOptions } from "../../../src/types/types.js";

describe("Get Teams", () => {
    it("RETURN - a list of teams when no options is provided", async () => {
        const teams = await getTeams();
        expect(teams).toBeDefined();
    });

    it("RETURN - a list of teams by name ", async () => {
        const teamOptions: TeamOptions = {
            name: process.env.TEST_CLICKUP_TEAM_NAME,
        };
        const teams = await getTeams(teamOptions);
        expect(teams).toBeDefined();
        expect(teams.length).toBeGreaterThan(0);
        expect(teams.every((team) => team.name === teamOptions.name)).toBe(
            true
        );
    });

    it("RETURN - a list of teams by teamId ", async () => {
        const teamOptions: TeamOptions = {
            teamId: process.env.TEST_CLICKUP_TEAM_ID,
        };
        const teams = await getTeams(teamOptions);

        expect(teams).toBeDefined();
        expect(teams.length).toBeGreaterThan(0);
        expect(teams.every((team) => team.id === teamOptions.teamId)).toBe(
            true
        );
    });

    it("THROW - non existing name is provided", async () => {
        const logSpy = jest.spyOn(global.console, "error");

        const teamOptions: TeamOptions = {
            name: "THIS TEAM DOESNT EXIST",
        };

        await expect(getTeams(teamOptions)).rejects.toThrow();
        expect(logSpy).toHaveBeenCalled();

        logSpy.mockRestore();
    });

    it("THROW - non existing id is provided", async () => {
        const logSpy = jest.spyOn(global.console, "error");

        const teamOptions: TeamOptions = {
            teamId: "",
        };

        await expect(getTeams(teamOptions)).rejects.toThrow();
        expect(logSpy).toHaveBeenCalled();

        logSpy.mockRestore();
    });

    it("THROW - invalid options are provided", async () => {
        const logSpy = jest.spyOn(global.console, "error");

        const teamOptions: TeamOptions = {
            name: "",
        };

        await expect(getTeams(teamOptions)).rejects.toThrow();
        expect(logSpy).toHaveBeenCalled();

        logSpy.mockRestore();
    });
});
