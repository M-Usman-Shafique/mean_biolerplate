import { TestBed } from "@angular/core/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { ThemeService } from "./theme.service";

describe("Theme", () => {
    let service: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideZonelessChangeDetection()],
        });
        service = TestBed.inject(ThemeService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
