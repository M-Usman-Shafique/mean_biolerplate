import { TestBed } from "@angular/core/testing";
import { CanActivateFn } from "@angular/router";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { guestGuard } from "./guest.guard";

describe("guestGuard", () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() => guestGuard(...guardParameters));

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                provideHttpClient(),
                provideRouter([]),
            ],
        });
    });

    it("should be created", () => {
        expect(executeGuard).toBeTruthy();
    });
});
