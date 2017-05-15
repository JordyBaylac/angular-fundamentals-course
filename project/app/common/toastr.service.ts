import { OpaqueToken } from '@angular/core';

export let TOASTR_OPAQUE_TOKEN = new OpaqueToken('toastr');

export interface Toastr{

    success(message: string, title?: string);

    warning(message: string, title?: string);

    info(message: string, title?: string);

    error(message: string, title?: string);

}



/**
 * Via 1 para hacer un wrapper de un object global, como toastr
 */

// import { Injectable } from '@angular/core';

// declare let toastr: any;

// @Injectable()
// export class ToastrService{

//     succes(message: string, title?: string){
//         toastr.success(message, title);
//     }

//     warning(message: string, title?: string){
//         toastr.warning(message, title);
//     }

//     info(message: string, title?: string){
//         toastr.info(message, title);
//     }

//     error(message: string, title?: string){
//         toastr.error(message, title);
//     }

// }