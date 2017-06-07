import {
    Component, Injector, NgModuleFactoryLoader, SystemJsNgModuleLoader, ViewChild,
    ViewContainerRef
} from "@angular/core";
import {NMLBComponent} from "./b.component";

@Component({
    moduleId: module.id,
    selector: 'nml-a-component',
    providers: [
        {
            provide: NgModuleFactoryLoader,
            useClass: SystemJsNgModuleLoader
        }
    ],
    template: 'I am A component that inserts dynamic B component below: <div #vc></div>'
})

export class NMLAComponent {
    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    constructor(private _injector: Injector, private loader: NgModuleFactoryLoader) {

    }

    ngAfterViewInit() {
        this.loader.load('app/ng-module-loader/nml-lazy.module.js#NMLLazyModule').then((factory) => {
            const module = factory.create(this._injector);
            const resolver = module.componentFactoryResolver;
            const cmpFactory = resolver.resolveComponentFactory(NMLBComponent);
            this._container.createComponent(cmpFactory);
        });
    }
}