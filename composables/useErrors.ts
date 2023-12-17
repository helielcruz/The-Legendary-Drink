import { isAxiosError } from "axios"
import type { WritableComputedRef } from "vue";
const locale: any = await import("../locale");

export default function () {

    const codeErros = [400, 401, 403, 404, 500, 501, 502, 503, 504, 505]

    const errorsVerify = (error: any, lang: WritableComputedRef<string>) => {
        
        let response: any
        if(isAxiosError(error)) {

            codeErros.find((code: number) => {
                
                if(error.response?.status === code) response = locale[lang.value].httpErrors[`${code}`]
            })
            if(!response) {
                response = locale[lang.value].genericErrors[error.message]
                if(!response) response = error.message
            }
            
            return response
        } else return error.message
    }

    return { errorsVerify }
}