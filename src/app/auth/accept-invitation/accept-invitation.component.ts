import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthResult } from '@nebular/auth';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.scss', '../auth.component.scss']
})
export class AcceptInvitationComponent implements OnInit {

  submitted = false;

  invitation_token: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(private _customAuthService: AuthService, private route: ActivatedRoute,
    protected router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.invitation_token === undefined) {
      this.router.navigate(['/']);
    } else {
      this.invitation_token = this.route.snapshot.queryParams.invitation_token;
    }
  }

  acceptInvitation() {
    this.errors = this.messages = [];
    this.submitted = true;
    this._customAuthService.acceptInvitation(this.invitation_token, this.user.password, this.user.password_confirmation)
      .subscribe((result: NbAuthResult) => {
        if (result.isSuccess()) {
          this.messages = result.getMessages();
        } else {

          this.submitted = false;
          this.errors = result.getErrors();
        }

        const redirect = result.getRedirect();
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, 500);
        }
      });
  }

}
