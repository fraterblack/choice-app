import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Unsubscrable } from 'src/app/shared/common';

import { FormHelper } from '../../../shared/form-helper';
import { AlertService, AlertType } from './../../../core/services/alert.service';
import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Unsubscrable implements OnInit {
  authGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    route: ActivatedRoute
  ) {
    super();

    // Logout user
    if (route.snapshot.routeConfig.path === 'logout') {
      authService.logout();

      this.router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    }

    this.authGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onLogin() {
    if (FormHelper.hasError(this.authGroup)) {
      FormHelper.markAllTouched(this.authGroup);

      return;
    }

    this.authService.login(
      this.authGroup.controls.email.value,
      this.authGroup.controls.password.value
    )
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      this.router.navigate(['/admin']);
    }, error => {
      this.alertService.open(error, AlertType.ERROR);
    });
  }
}
