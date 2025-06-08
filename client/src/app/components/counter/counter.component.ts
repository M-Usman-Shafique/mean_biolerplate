import { Component, signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { selectCounter } from "../../store/counter/counter.selectors";
import { AppState } from "../../store/app.state";
import { decrement, increment, reset } from "../../store/counter/counter.actions";

@Component({
    selector: "app-counter",
    imports: [MatButtonModule, MatIconModule, MatCardModule],
    templateUrl: "./counter.component.html",
    styleUrl: "./counter.component.scss",
})
export class counterComponent {
    counter = signal(0);

    constructor(private store: Store<AppState>) {
        this.store.select(selectCounter).subscribe((value) => this.counter.set(value));
    }

    onIncrement() {
        this.store.dispatch(increment());
    }

    onDecrement() {
        this.store.dispatch(decrement());
    }

    onReset() {
        this.store.dispatch(reset());
    }
}
