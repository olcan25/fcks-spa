export interface Error{
    propertyName:string
    errorMessage:string
    attemptedValue:string
    customState:string
    severity:number
    errorCode:string
    formattedMessagePlaceholderValues:FormattedMessagePlaceholderValues
}

export interface FormattedMessagePlaceholderValues{
    propertyName: string
    propertyValue: string
}