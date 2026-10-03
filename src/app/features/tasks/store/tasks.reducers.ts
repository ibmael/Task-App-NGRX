import { createReducer, on } from '@ngrx/store';
import { initialTaskState } from './tasks.state';
import { tasksActions } from './tasks.actions';

export const tasksReducer = createReducer(
  initialTaskState,
  on(tasksActions.loadTasks, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(tasksActions.loadSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    isLoading: false,
  })),

  on(tasksActions.loadFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),

  on(tasksActions.toggle, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(tasksActions.toggleSuccess, (state, { task }) => ({
    ...state,
    isLoading: false,
    tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
  })),

  on(tasksActions.toggleFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(tasksActions.setFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

  // ADD & DELETE MY EDITS
  on(tasksActions.addTask, tasksActions.deleteTask, (state) => ({
  ...state,
  error: null,
})),

on(tasksActions.addSuccess, (state, { task }) => ({
  ...state,
  tasks: [task, ...state.tasks],
  error: null,
})),

on(tasksActions.deleteSuccess, (state, { taskID }) => ({
  ...state,
  tasks: state.tasks.filter((task) => task._id !== taskID),
  error: null,
})),

on(
  tasksActions.addFailure,
  tasksActions.deleteFailure,
  (state, { error }) => ({
    ...state,
    error,
  }),
),
);
