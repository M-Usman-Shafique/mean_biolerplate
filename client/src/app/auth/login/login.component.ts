import { Component, inject, signal } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { finalize } from "rxjs";
import { AuthResponse } from "../../core/types/auth";
import { NotificationService } from "../../core/services/notification.service";
import { redirectToReturnUrl } from "../../core/utils/redirect.util";

@Component({
    selector: "app-login",
    imports: [
        RouterLink,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    private notification = inject(NotificationService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    constructor() {}

    isSubmitting = signal(false);
    userData: any;

    loginForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, this.strictEmailValidator]),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });

    private strictEmailValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;
        return value && !strictEmailRegex.test(value) ? { email: true } : null;
    }

    async handleLogin(): Promise<void> {
        if (this.isSubmitting()) return;

        this.loginForm.markAllAsTouched();
        if (this.loginForm.invalid) return;

        this.userData = this.loginForm.value;
        this.isSubmitting.set(true);

        this.authService
            .login(this.userData)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: (response: AuthResponse) => {
                    this.notification.success(response.message);
                    this.loginForm.reset();
                    this.userData = null;
                    Object.keys(this.loginForm.controls).forEach((key) =>
                        this.loginForm.get(key)?.setErrors(null)
                    );
                    this.authService.setAuthState(true, response.data.user);
                    redirectToReturnUrl(this.route, this.router);
                },
                error: (error) => {
                    this.notification.error(error.error?.message || "Login failed.");
                    console.error(error);
                },
                complete: () => {
                    console.log("Login successful...");
                },
            });
    }
}
