import { Component, OnDestroy, OnInit, signal } from "@angular/core";
import dayjs from "dayjs/esm";

@Component({
    selector: "app-date-time",
    imports: [],
    templateUrl: "./date-time.component.html",
    styleUrl: "./date-time.component.scss",
})
export class DateTimeComponent implements OnInit, OnDestroy {
    readonly date = signal("");
    readonly time = signal("");
    private intervalId?: ReturnType<typeof setInterval>;

    ngOnInit(): void {
        this.updateTime();
        this.intervalId = setInterval(() => this.updateTime(), 1000);
    }

    updateTime(): void {
        const now = dayjs();
        this.date.set(now.format("ddd DD MMM YYYY"));
        this.time.set(now.format("hh:mm:ss A"));
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}
