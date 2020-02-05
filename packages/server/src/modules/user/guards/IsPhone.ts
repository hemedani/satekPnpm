import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
    validate(phone: string) {
        const phonePattern = /^(\+98|\+980|98|980|0)?9\d{9}$/;
        return !!phone.match(phonePattern);
    }

    defaultMessage() {
        return "mobile number must be valid (e.g. 09xxxxxxxxx)";
    }
}

export function IsPhone(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneConstraint
        });
    };
}
