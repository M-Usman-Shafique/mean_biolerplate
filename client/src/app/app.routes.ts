// app.routes.ts
import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { HomeComponent } from "./features/home/home.component";
import { authGuard } from "./core/guards/auth-guard";
import { guestGuard } from "./core/guards/guest-guard";

export const routes: Routes = [
    {
        path: "",
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: "",
                component: HomeComponent,
            },
            {
                path: "dashboard",
                loadComponent: () =>
                    import("./features/dashboard/dashboard.component").then(
                        (m) => m.DashboardComponent
                    ),
            },
        ],
    },
    {
        path: "login",
        component: AuthLayoutComponent,
        canMatch: [guestGuard],
        children: [
            {
                path: "",
                loadComponent: () =>
                    import("./auth/login/login.component").then((m) => m.LoginComponent),
            },
        ],
    },
    {
        path: "signup",
        component: AuthLayoutComponent,
        canMatch: [guestGuard],
        children: [
            {
                path: "",
                loadComponent: () =>
                    import("./auth/signup/signup.component").then((m) => m.SignupComponent),
            },
        ],
    },

    {
        path: "**",
        loadComponent: () =>
            import("./features/not-found/not-found.component").then((m) => m.NotFoundComponent),
    },
];
