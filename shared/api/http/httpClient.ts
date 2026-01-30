
export class HttpError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = "HttpError"
        this.status = status
    }
}

type SearchParams = Record<string, string | number | boolean | undefined>

type HttpClientOptions<TBody = unknown> = RequestInit & {
    searchParams?: SearchParams
    body?: TBody
}

const resolveBaseUrl = () => {
    return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
}

const buildUrl = (path: string, searchParams?: SearchParams) => {
    const url = new URL(path, resolveBaseUrl())

    if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value === undefined) return
            url.searchParams.set(key, String(value))
        })
    }

    return url.toString()
}

export async function httpClient<TResult = unknown, TBody = unknown>(
    path: string,
    options: HttpClientOptions<TBody> = {},
): Promise<TResult> {
    const { searchParams, headers, body, ...rest } = options

    const response = await fetch(buildUrl(path, searchParams), {
        ...rest,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        throw new HttpError(`Request failed with status ${response.status}`, response.status)
    }

    return (await response.json()) as TResult
}