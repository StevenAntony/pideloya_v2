import React from 'react'

export default function TryValidationRequest({
    validations
} : {
    validations: Array<any>
}) {

    const validationsList:Array<any> = [];

    for (const key in validations) {
        if (Object.prototype.hasOwnProperty.call(validations, key)) {
            const element = validations[key];
            validationsList.push(
                <li key={key}>
                    {element[0]}
                </li>
            )
        }
    }

    return (
        <ul>
            {
                validationsList.map(obj => obj)
            }
        </ul>
    )
}
