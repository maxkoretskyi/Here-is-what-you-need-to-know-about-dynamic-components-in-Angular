import {NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from "@angular/core";
import {NMLAComponent} from "./a.component";

@NgModule({
    declarations: [NMLAComponent],
    entryComponents: [NMLAComponent],
    exports: [NMLAComponent]
})

export class NMLModule {

}