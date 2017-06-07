import {Compiler, Component, Injector, NgModule, NgModuleRef, ViewChild, ViewContainerRef} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'otf-a-component',
    template: 'I am A component that inserts dynamic B component below: <div #vc></div>'
})

export class OTFAComponent {
    @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

    constructor(private _compiler: Compiler,
                private _injector: Injector,
                private _m: NgModuleRef<any>) {
    }

    ngAfterViewInit() {
        const template = '<span>I am {{name}}</span>';

        const tmpCmp = Component({template: template})(class {
        });
        const tmpModule = NgModule({declarations: [tmpCmp]})(class {
        });

        this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = f.create(this._injector, [], null, this._m);
                cmpRef.instance.name = 'B component';
                this._container.insert(cmpRef.hostView);
            })
    }
}