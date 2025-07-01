import { Component, signal } from "@angular/core";
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { AuthService } from "../../core/services/auth.service";
import { setToStorage } from "../../core/utils/localstorage";
import { finalize } from "rxjs";
import { AuthResponse } from "../../core/constants/types";
import { NotificationService } from "../../core/services/notification.service";

@Component({
    selector: "app-signup",
    imports: [
        RouterLink,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    templateUrl: "./signup.component.html",
    styleUrl: "./signup.component.scss",
})
export class SignupComponent {
    constructor(
        private notification: NotificationService,
        private authService: AuthService,
        private router: Router
    ) {}

    isSubmitting = signal(false);
    userData: any;

    signupForm: FormGroup = new FormGroup(
        {
            username: new FormControl("", [Validators.required, Validators.minLength(3)]),
            email: new FormControl("", [Validators.required, this.strictEmailValidator]),
            password: new FormControl("", [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl("", [Validators.required]),
            role: new FormControl(""),
        },
        { validators: this.passwordMatchValidator }
    );

    private strictEmailValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;
        return value && !strictEmailRegex.test(value) ? { email: true } : null;
    }

    private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get("password")?.value;
        const confirmPassword = control.get("confirmPassword")?.value;

        if (password && confirmPassword && password !== confirmPassword) {
            control.get("confirmPassword")?.setErrors({ mismatch: true });
            return { mismatch: true };
        } else {
            const confirmPasswordControl = control.get("confirmPassword");
            if (confirmPasswordControl?.hasError("mismatch")) {
                confirmPasswordControl.setErrors(null);
            }
        }

        return null;
    }

    async handleSignup(): Promise<void> {
        if (this.isSubmitting()) return;

        this.signupForm.markAllAsTouched();
        if (this.signupForm.invalid) return;

        this.userData = this.signupForm.value;
        this.userData.role = this.userData.role || "User";
        this.isSubmitting.set(true);

        this.authService
            .signup(this.userData)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: ({ user, message }: AuthResponse) => {
                    this.notification.success(message);
                    setToStorage("userInfo", user);
                    this.userData = null;
                    this.signupForm.reset();
                    Object.keys(this.signupForm.controls).forEach((key) =>
                        this.signupForm.get(key)?.setErrors(null)
                    );
                    this.authService.setAuthState(true);
                    this.router.navigate(["/"]);
                },
                error: (error) => {
                    this.notification.error(error?.message || "Signup failed.");
                    console.error(error);
                },
                complete: () => {
                    console.log("Signup successful...");
                },
            });
    }
}
