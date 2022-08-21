import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { catchError, of, map } from "rxjs";
import { EnzoicService } from "../enzoic.service";


@Injectable({
    providedIn: 'root'
})
export class CompromisedPassword implements AsyncValidator {
    
    constructor(private enzoic: EnzoicService){}
    
    validate = (control: FormControl) => {
        return this.enzoic.checkPassword(control.value).pipe(
            map(() => {
                return {compromised: true} //this is bad
            }),
            catchError((err) => {
                console.log(err); //return error if password is not compromised
                return of(null); //create an observable
            })
        );
    }
}
