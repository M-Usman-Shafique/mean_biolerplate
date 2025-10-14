import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideZonelessChangeDetection } from "@angular/core";

import { DateTimeComponent } from "./date-time.component";

describe("DateTime", () => {
    let component: DateTimeComponent;
    let fixture: ComponentFixture<DateTimeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DateTimeComponent],
            providers: [provideZonelessChangeDetection()],
        }).compileComponents();

        fixture = TestBed.createComponent(DateTimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
