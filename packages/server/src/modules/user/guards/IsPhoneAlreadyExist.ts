import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";
import { User } from "../../../entity/User";

@ValidatorConstraint({ async: true })
export class IsPhoneExistConstraint implements ValidatorConstraintInterface {
    validate(phone: string) {
        return User.findOne({ where: { phone } }).then(user => {
            if (user) return false;
            return true;
        });
    }

    defaultMessage() {
        return "این شماره موبایل قبلا ثبت شده است.";
    }
}

export function IsPhoneExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneExistConstraint
        });
    };
}
