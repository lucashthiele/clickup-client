import { get } from "../../../src/services/teams/get.js";
import { TeamOptions } from "../../../src/types/types.js";

describe("Get Teams", () => {
    const originalEnv = process.env;

    afterEach(() => {
        process.env = originalEnv;
    });

    it("return a list of teams when no options is provided", async () => {
        const teams = await get();
        expect(teams).toBeDefined();
    });

    it("return a list of teams by name ", async () => {
        const teamOptions: TeamOptions = {
            name: "WORKSPACE_TEST",
        };
        const teams = await get(teamOptions);
        expect(teams).toBeDefined();
        expect(teams.length).toBeGreaterThan(0);
        expect(teams.every((team) => team.name === teamOptions.name)).toBe(
            true
        );
    });

    it("return a list of teams by teamId ", async () => {
        const teamOptions: TeamOptions = {
            teamId: "9011491197",
        };
        const teams = await get(teamOptions);

        expect(teams).toBeDefined();
        expect(teams.length).toBeGreaterThan(0);
        expect(teams.every((team) => team.id === teamOptions.teamId)).toBe(
            true
        );
    });

    it("return an empty list of teams", async () => {
        const teamOptions: TeamOptions = {
            name: "This team doesn't exist",
        };
        const teams = await get(teamOptions);
        expect(teams).toEqual([]);
    });

    it("throw an error when invalid options are provided", async () => {
        const logSpy = jest.spyOn(global.console, "error");

        const teamOptions = {
            name: "",
        };

        await expect(get(teamOptions)).rejects.toThrow();
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy.mock.calls).toContainEqual([
            "CLICKUP_CLIENT_ERROR -",
            "GET_TEAM: Invalid options provided",
        ]);

        logSpy.mockRestore();
    });
});
