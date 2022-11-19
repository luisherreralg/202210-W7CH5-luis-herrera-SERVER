export interface CustomError extends Error {
    statusCode: number;
    statusMessage: string;
}

export function HTTPError(
    code: number,
    statusMessage: string,
    messageText: string
) {
    return {
        statusCode: code,
        statusMessage: statusMessage,
        message: messageText,
    };
}

export function createHttpError(error: Error) {
    if ((error as Error).message === 'Not found id') {
        const httpError = HTTPError(404, 'Not Found', (error as Error).message);
        return httpError;
    }
    const httpError = HTTPError(
        503,
        'Service unavailable',
        (error as Error).message
    );
    return httpError;
}
