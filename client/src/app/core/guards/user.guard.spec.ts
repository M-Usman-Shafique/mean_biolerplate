import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { provideZonelessChangeDetection } from "@angular/core";
import { userGuard } from "./user.guard";
import { AuthService } from "../services/auth.service";

describe("UserGuard", () => {
    let mockRouter: jasmine.SpyObj<Router>;
    let mockAuthService: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
        const authServiceSpy = jasmine.createSpyObj("AuthService", ["authReady", "getCurrentUser"]);

        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                { provide: Router, useValue: routerSpy },
                { provide: AuthService, useValue: authServiceSpy },
            ],
        });

        mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    });

    it("should be created", () => {
        expect(userGuard).toBeTruthy();
    });
});
