import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../services/auth';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective {

  constructor(

    private templateRef: 
      TemplateRef<any>,

    private viewContainer:
      ViewContainerRef,

    private authService:
      AuthService

  ) {}

  @Input()
  set appHasRole(roles: string[]) {
    
    const hasRole = this.authService.hasAnyRole(roles);
    
    if (hasRole) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
