import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { tasksActions } from '../../store/tasks.actions';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  private store = inject(Store);
  private actions$ = inject(Actions);

  submitting = signal(false);
  error = signal<string | null>(null);

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/\S/),
      ],
    }),
    user: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/\S/),
      ],
    }),
  });

  constructor() {
    this.actions$
      .pipe(
        ofType(tasksActions.addSuccess),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.submitting.set(false);
        this.form.controls.title.reset();
      });

    this.actions$
      .pipe(
        ofType(tasksActions.addFailure),
        takeUntilDestroyed(),
      )
      .subscribe(({ error }) => {
        this.submitting.set(false);
        this.error.set(error);
      });
  }

  submit() {
    if (this.form.invalid || this.submitting()) return;

    const { title, user } = this.form.getRawValue();

    this.submitting.set(true);
    this.error.set(null);

    this.store.dispatch(
      tasksActions.addTask({
        title: title.trim(),
        user: user.trim(),
      }),
    );
  }
}