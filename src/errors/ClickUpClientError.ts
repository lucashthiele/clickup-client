import { AxiosError } from "axios";

export class ClickUpClientError extends Error {
    private errorMap: Map<string, (error: any) => string> = new Map([
        ["AxiosError", this.getAxiosErrorMessage],
        ["Error", this.getErrorMessage],
    ]);

    constructor(error: any) {
        super(error.message);

        this.name = "ClickUpClientError";
        console.error("CLICKUP_CLIENT_ERROR -", this.getLogText(error));

        Object.setPrototypeOf(this, ClickUpClientError.prototype);
    }

    getLogText(error: any): string {
        const errorHandler = this.errorMap.get(error.constructor.name);
        return errorHandler ? errorHandler(error) : error.message;
    }

    getAxiosErrorMessage(error: AxiosError): string {
        return `AxiosError - StatusCode: ${error.status} - Message:${error.message}`;
    }

    getErrorMessage(error: any): string {
        return error.message;
    }
}
