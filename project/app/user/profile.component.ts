import { Toastr, TOASTR_OPAQUE_TOKEN } from './../common/toastr.service';
import { IUser } from './user.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

import { Component, OnInit, Inject } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'profile.component.html',
    styles: [`
        em {
            float: right;
            color: #e05c65;
            padding-left:10px;
        }
        .error input { background-color: #e3c3c5; }
        .error ::-webkit-input-placeholder { color: #999; }
        .error ::-moz-placeholder { color: #999; }
        .error :-moz-placeholder { color: #999; }
        .error :ms-input-placeholder { color: #999; }
    `]

})
export class ProfileComponent implements OnInit{

    profileForm: FormGroup;

    //! desarrollado por mi para dar mensajes especificos a situaciones distintas
    //      usando solo patterns!
    private firstNamePatterns = (() => {

        let CapitalLetter = {
                pattern: '[A-Z].*',
                message: 'Must start with a capital letter!'
            },
            NotUseAdminName  = {
                pattern: '(?!Admin).+',
                message: 'Please, do not use Admin as a first name'
            },
            OnlyLetters  = {
                pattern: '[a-zA-Z]*',
                message: 'Please, only use letters.'
            };

        let angularRegExpForm = (ourPattern: string): string => {
            return '^' + ourPattern + '$';
        };

        return {

            CapitalLetterPattern: Validators.pattern(CapitalLetter.pattern),
            OnlyLettersPattern: Validators.pattern(OnlyLetters.pattern),
            NotUseAdminName: Validators.pattern(NotUseAdminName.pattern),

            getErrorMessage(formControl: FormControl): string{

                let requiredPattern = formControl.errors['pattern'].requiredPattern;

                if (requiredPattern === angularRegExpForm(CapitalLetter.pattern))
                    return CapitalLetter.message;

                if (requiredPattern === angularRegExpForm(OnlyLetters.pattern))
                    return OnlyLetters.message;

                if (requiredPattern === angularRegExpForm(NotUseAdminName.pattern))
                    return NotUseAdminName.message;

            }
        };
    })();

    constructor(private _router: Router,
                private _authService: AuthService,
                @Inject(TOASTR_OPAQUE_TOKEN) private toastr: Toastr ){

    }

    redirect(){
        this._router.navigate(['/events']);
    }

    ngOnInit(){


        //!> Pupulating data into formControls, and setting validators


        let firstName = new FormControl();
        //!     via 1
        firstName.setValue(this._authService.currentUser.firstName);
        firstName.setValidators([Validators.required,
                                 this.firstNamePatterns.NotUseAdminName,
                                 this.firstNamePatterns.OnlyLettersPattern,
                                 this.firstNamePatterns.CapitalLetterPattern]);

        //!     via 2
        let lastName = new FormControl(this._authService.currentUser.lastName,
                                       Validators.required);


        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName: lastName
        });

    }

    saveProfile(formValues: IUser){

        if (this.profileForm.valid){
            console.log('form is valid');
            this._authService.updateCurrentUser(formValues.firstName, formValues.lastName)
                .subscribe(res => {
                    this.toastr.success('Porfile has been saved', 'Success');
                });

            this.redirect();
        } else {
            console.log('form is invalid');
            this.toastr.error('Form is invalid', 'Error');
        }

    }

    isValidLastNameControl(): boolean{

        return this.profileForm.controls['lastName'].valid
            || this.profileForm.controls['lastName'].untouched;

    }

}