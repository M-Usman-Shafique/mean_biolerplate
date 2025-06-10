import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { counterComponent } from "../../shared/counter/counter.component";
import { RouterLink } from "@angular/router";
import dayjs from "dayjs";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [counterComponent, RouterLink, MatButtonModule, MatIconModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
    readonly title = "Homepage";
    date: string = "";
    time: string = "";
    private intervalId: any;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.updateTime();
        this.intervalId = setInterval(() => {
            this.updateTime();
            this.cdr.markForCheck();
        }, 1000);
    }

    updateTime(): void {
        const now = dayjs();
        this.date = now.format("ddd DD MMM YYYY");
        this.time = now.format("hh:mm:ss A");
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}
