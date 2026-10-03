import { Component, inject, input, output,signal } from '@angular/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Task } from '../../task.model';
import { Store } from '@ngrx/store';
import { tasksActions } from '../../store/tasks.actions';
// my edits
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-task-card',
  imports: [ToggleSwitchModule, FormsModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input<Task>({} as Task);
  _store = inject(Store);

  toggle() {
    this._store.dispatch(
      tasksActions.toggle({ taskID: this.task()._id, completedStatus: this.task().completed! }),
    );
  }

  // my edits
  private actions$ = inject(Actions);

deleting = signal(false);
deleteError = signal<string | null>(null);

constructor() {
  this.actions$
    .pipe(
      ofType(tasksActions.deleteFailure),
      takeUntilDestroyed(),
    )
    .subscribe(({ error }) => {
      if (this.deleting()) {
        this.deleting.set(false);
        this.deleteError.set(error);
      }
    });
}

remove() {
  if (this.deleting()) return;

  this.deleting.set(true);
  this.deleteError.set(null);

  this._store.dispatch(
    tasksActions.deleteTask({
      taskID: this.task()._id,
    }),
  );
}
}
