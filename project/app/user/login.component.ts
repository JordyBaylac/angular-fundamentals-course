import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styles: [`
        .error {
            float: right;
            color: #e05c65;
            padding-left:10px;
        }
    `]
})
export class LoginComponent{

    loginInvalid = false;

    constructor( private _authService: AuthService,
                 private _router: Router ){}


    login(formValues){

        this._authService.loginUser(formValues.userName, formValues.password)
                            .subscribe( res => {
                                if (!res){
                                    this.loginInvalid = true;
                                }
                                else{
                                    this.redirect();
                                }
                            });


    }

    redirect(){
        this._router.navigate(['/events']);
    }

}