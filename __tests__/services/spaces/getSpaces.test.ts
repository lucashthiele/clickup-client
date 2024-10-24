import { getSpaces } from "../../../src/services/spaces/getSpaces.js";
import { SpaceOptions, TeamProperties } from "../../../src/types/types.js";

describe("Get Spaces", () => {
    it("RETURN - list of spaces when no options is provided", async () => {
        const spaces = await getSpaces();

        expect(spaces).toBeDefined();
    });

    it("RETURN - list of spaces by spaceId", async () => {
        const spaceOptions: SpaceOptions = {
            spaceId: process.env.TEST_CLICKUP_SPACE_ID,
        };

        const spaces = await getSpaces(spaceOptions);

        expect(spaces).toBeDefined();
        expect(spaces.every((space) => space.id === spaceOptions.spaceId)).toBe(
            true
        );
    });

    it("RETURN - list of spaces by spaceName", async () => {
        const spaceOptions: SpaceOptions = {
            name: process.env.TEST_CLICKUP_SPACE_NAME,
        };

        const spaces = await getSpaces(spaceOptions);

        expect(spaces).toBeDefined();
        expect(spaces.every((space) => space.name === spaceOptions.name)).toBe(
            true
        );
    });

    it("RETURN - list of spaces by teamId", async () => {
        const spaceOptions: SpaceOptions = {
            teamId: process.env.TEST_CLICKUP_TEAM_ID,
        };

        const spaces = await getSpaces(spaceOptions);

        expect(spaces).toBeDefined();
        expect(spaces.every((space) => space.teamId)).toBeDefined();
        expect(
            spaces.every((space) => space.teamId === spaceOptions.teamId)
        ).toBe(true);
    });

    it("RETURN - list of spaces by teamName", async () => {
        const spaceOptions: SpaceOptions = {
            teamName: process.env.TEST_CLICKUP_TEAM_NAME,
        };

        const spaces = await getSpaces(spaceOptions);

        expect(spaces).toBeDefined();
        expect(spaces.every((space) => space.teamId)).toBeDefined;
        expect(
            spaces.every(
                (space) => space.teamId === process.env.TEST_CLICKUP_TEAM_ID
            )
        ).toBe(true);
    });

    it("RETURN - list of spaces by teamId and spaceName", async () => {
        const spaceOptions: SpaceOptions = {
            teamId: process.env.TEST_CLICKUP_TEAM_ID,
            name: process.env.TEST_CLICKUP_SPACE_NAME,
        };

        const spaces = await getSpaces(spaceOptions);

        expect(spaces).toBeDefined();
        expect(spaces.every((space) => space.teamId)).toBeDefined;
        expect(
            spaces.every((space) => space.teamId === spaceOptions.teamId)
        ).toBe(true);
        expect(spaces.every((space) => space.name === spaceOptions.name)).toBe(
            true
        );
    });

    it("RETURN - list of spaces by teamName and spaceName", async () => {
        const spaceOptions: SpaceOptions = {
            teamName: process.env.TEST_CLICKUP_TEAM_NAME,
            name: process.env.TEST_CLICKUP_SPACE_NAME,
        };

        const spaces = await getSpaces(spaceOptions);

        expect(spaces).toBeDefined();
        expect(spaces.every((space) => space.teamId)).toBeDefined;
        expect(
            spaces.every(
                (space) => space.teamId === process.env.TEST_CLICKUP_TEAM_ID
            )
        ).toBe(true);
        expect(spaces.every((space) => space.name === spaceOptions.name)).toBe(
            true
        );
    });

    it("THROW - spaces were not found", async () => {
        const logSpy = jest.spyOn(global.console, "error");

        const spaceOptions: SpaceOptions = {
            name: "THIS SPACE DOES NOT EXISTS",
        };

        await expect(getSpaces(spaceOptions)).rejects.toThrow();
        expect(logSpy).toHaveBeenCalled();

        logSpy.mockRestore();
    });

    it("THROW - invalid options are provided", async () => {
        const logSpy = jest.spyOn(global.console, "error");

        const spaceOptions: SpaceOptions = {
            name: "",
        };

        await expect(getSpaces(spaceOptions)).rejects.toThrow();
        expect(logSpy).toHaveBeenCalled();
        expect(logSpy.mock.calls).toContainEqual([
            "CLICKUP_CLIENT_ERROR -",
            "GET_SPACE: Invalid options provided",
        ]);

        logSpy.mockRestore();
    });

    it("THROW - invalid team is passed in options", async () => {
        const logSpy = jest.spyOn(global.console, "error");

        const spaceOptions: SpaceOptions = {
            teamId: "0",
        };

        await expect(getSpaces(spaceOptions)).rejects.toThrow();
        expect(logSpy).toHaveBeenCalled();

        logSpy.mockRestore();
    });
});
