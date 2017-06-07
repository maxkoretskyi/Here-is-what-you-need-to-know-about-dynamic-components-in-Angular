import {NgModule} from "@angular/core";
import {FRAComponent} from "./a.component";
import {FRBComponent} from "./b.component";

@NgModule({
    declarations: [FRAComponent, FRBComponent],
    entryComponents: [FRAComponent, FRBComponent],
    exports: [FRAComponent, FRBComponent]
})

export class FRModule {

}