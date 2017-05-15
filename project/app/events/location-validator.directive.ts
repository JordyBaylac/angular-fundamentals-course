
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[validate-location]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: LocationValidatorDirective,
            multi: true //! esto hace que se adicione el validator al listado de validators de angular
        }
    ]
})
export class LocationValidatorDirective implements Validator{

    validate(formGroup: FormGroup): {[key: string] : any} {
        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['country'];

        //! via 1 para castear el root del formGroup, dado que yo se que es de tipo FormGroup
        let onlineUrlControl = (formGroup.root as FormGroup).controls['onlineUrl'];
        //! via 2
        onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if ( (addressControl && addressControl.value && cityControl && cityControl.value &&
                countryControl && countryControl.value)
            || (onlineUrlControl && onlineUrlControl.value) )
            return null; //! no hay errores, no se esta vilando la validacion

        return {validateLocation: false};

    }

}