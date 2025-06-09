import { ComponentFixture, TestBed } from "@angular/core/testing";
import { counterComponent } from "./counter.component";

describe("Cart", () => {
    let component: counterComponent;
    let fixture: ComponentFixture<counterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [counterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(counterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
