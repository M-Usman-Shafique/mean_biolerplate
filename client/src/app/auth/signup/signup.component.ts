import { Component } from "@angular/core";
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
import { RouterLink } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-signup",
    imports: [
        RouterLink,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    templateUrl: "./signup.component.html",
    styleUrl: "./signup.component.scss",
})
export class SignupComponent {
    isSubmitting = false;
    formData: any;

    signupForm: FormGroup = new FormGroup(
        {
            username: new FormControl("", [Validators.required, Validators.minLength(3)]),
            email: new FormControl("", [Validators.required, this.strictEmailValidator]),
            password: new FormControl("", [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl("", [Validators.required]),
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

    handleSubmit(): void {
        this.signupForm.markAllAsTouched();
        if (!this.signupForm.valid) return;

        this.isSubmitting = true;

        this.formData = this.signupForm.value;
        console.log("Form submitted:", this.signupForm.value);
        this.isSubmitting = false;
    }
}
