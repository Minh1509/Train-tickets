import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "isPhoneNumber" })
export class IsPhoneNumberValidator implements ValidatorConstraintInterface {
    validate(phone: string, args: ValidationArguments) {
        phone = phone.replace(/[^0-9+]/g, "");
        if (phone.startsWith("+84")) {
            phone = "0" + phone.substring(3);
        }
        return phone.length === 10;
    }

    defaultMessage(args: ValidationArguments) {
        return "Phone number not valid"
    }
}


@ValidatorConstraint({ name: 'isValidEmail' })
export class IsEmailValidator implements ValidatorConstraintInterface {
    validate(email: string, args: ValidationArguments) {
        const allowedEmail = ['gmail.com', 'ptit.edu.vn'];
        const emailDomain = email.trim().split("@");
        return allowedEmail.includes(emailDomain[1]);
    }
    defaultMessage(args: ValidationArguments) {
        return 'Email must be from one of the following domains: gmail.com, ptit.edu.vn';
    }
}