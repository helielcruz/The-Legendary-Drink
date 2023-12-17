import { isAxiosError } from "axios"

export default function () {

    const responseErrors: any = {
        400: '400 – Bad Request',
        401: '401 – Unauthorized',
        403: '403 – Forbidden',
        404: '404 – Not Found',
        500: '500 – Internal Server Error',
        501: '501 – Not Implemented',
        502: '502 – Bad Gateway',
        503: '503 – Service Unavailable',
        504: '504 – Gateway Time-out',
        505: '505 – HTTP Version Not Supported'
    }

    const codeErros = [400, 401, 403, 404, 500, 501, 502, 503, 504, 505]

    const errorsVerify = (error: any) => {
        
        let response: number[]  = []
        if(isAxiosError(error))
            response = codeErros.filter((code: number) => {
            if(error.response?.status === code) return responseErrors[`${code}`]
        })
        
        if(response.length) return response
        else return error.message
    }

    return { errorsVerify }
}