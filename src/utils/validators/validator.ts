export type validatorType = (value: string) => string | undefined

export const required: validatorType = (value) => {
    if (value) return undefined
    return 'Required'   
}

export const maxLengthCreator = (maxLength: number): validatorType => {
    return (value) => {
        if(value.length < maxLength) return undefined
        return `Max length is ${maxLength} symbols`
    }
}