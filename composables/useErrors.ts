export default function () {

    const errorsVerify = (error: Error) => {
        return ['400', '500'].filter((code: string) => {
            if(error.message.includes(code)) return code
        }) 
    }

    return { errorsVerify }
}