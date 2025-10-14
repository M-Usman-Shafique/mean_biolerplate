import { Component, inject, OnInit, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CheckoutService } from "../../core/services/checkout.service";
import { VerifySessionResponse } from "../../core/types/checkout";

@Component({
    selector: "app-success",
    imports: [RouterLink, MatButtonModule],
    templateUrl: "./success.component.html",
    styleUrl: "./success.component.scss",
})
export class SuccessComponent implements OnInit {
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private checkoutService = inject(CheckoutService);
    readonly sessionId = signal<string | null>(null);

    constructor() {}

    ngOnInit(): void {
        this.verifyStripeSession();
    }

    verifyStripeSession() {
        const id = this.route.snapshot.queryParamMap.get("session_id");

        if (!id) {
            this.router.navigate(["/not-found"], {
                queryParams: { error: "no_session_id" },
            });
            return;
        }

        this.checkoutService.verifySession(id).subscribe({
            next: (res: VerifySessionResponse) => {
                console.log("Stripe session verified:", res);
                this.sessionId.set(id);
            },
            error: (err) => {
                console.error("Stripe session verification failed:", err);
                this.router.navigate(["/not-found"], {
                    queryParams: { error: "no_session_id" },
                });
            },
        });
    }
}
