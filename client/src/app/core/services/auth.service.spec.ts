import { TestBed } from "@angular/core/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";

import { AuthService } from "./auth.service";

describe("Auth", () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideZonelessChangeDetection(),
                provideHttpClient(),
            ],
        });
        service = TestBed.inject(AuthService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
