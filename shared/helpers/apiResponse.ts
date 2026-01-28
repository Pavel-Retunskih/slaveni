export type ApiSuccessResponse<TData> = {
  success: true
  data: TData
}

export type ApiErrorFields = Record<string, { message: string }>

export type ApiErrorResponse<TFields = ApiErrorFields> = {
  success: false
  error: {
    code: string
    message: string
    fields?: TFields
  }
}

export type ApiResponse<TData, TFields = ApiErrorFields> =
  | ApiSuccessResponse<TData>
  | ApiErrorResponse<TFields>

export function createSuccessResponse<TData>(data: TData): ApiSuccessResponse<TData> {
  return {
    success: true,
    data,
  }
}

export function createErrorResponse<TFields = ApiErrorFields>(params: {
  code: string
  message: string
  fields?: TFields
}): ApiErrorResponse<TFields> {
  const { code, message, fields } = params

  return {
    success: false,
    error: {
      code,
      message,
      ...(fields ? { fields } : {}),
    },
  }
}

export class ApiResponseError<TFields = ApiErrorFields> extends Error {
  public code: string
  public fields?: TFields

  constructor(params: { code: string; message: string; fields?: TFields }) {
    super(params.message)
    this.code = params.code
    this.fields = params.fields
    this.name = params.code === "validation_error" ? "ValidationError" : "ApiResponseError"
  }
}

export async function parseApiResponse<TData, TFields = ApiErrorFields>(response: Response): Promise<ApiResponse<TData, TFields>> {
  let payload: unknown

  try {
    payload = await response.json()
  } catch (_jsonError) {
    throw new ApiResponseError<TFields>({
      code: "invalid_json",
      message: "Некорректный ответ сервера",
    })
  }

  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    typeof (payload as { success?: unknown }).success === "boolean"
  ) {
    return payload as ApiResponse<TData, TFields>
  }

  throw new ApiResponseError<TFields>({
    code: "invalid_payload",
    message: "Неожиданный формат ответа сервера",
  })
}

export async function resolveApiResponse<TData, TFields = ApiErrorFields>(response: Response): Promise<TData> {
  const payload = await parseApiResponse<TData, TFields>(response)

  if (payload.success) {
    return payload.data
  }

  throw new ApiResponseError<TFields>({
    code: payload.error.code,
    message: payload.error.message,
    fields: payload.error.fields,
  })
}
