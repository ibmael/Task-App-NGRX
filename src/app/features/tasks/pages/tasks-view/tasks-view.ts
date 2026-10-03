import { Component } from '@angular/core';
import { TaskList } from '../../components/task-list/task-list';
import { FilterButtonsGroup } from '../../components/filter-buttons-group/filter-buttons-group';
// my edits
import { AddTask } from '../../components/add-task/add-task';

@Component({
  selector: 'app-tasks-view',
  imports: [TaskList, FilterButtonsGroup, AddTask],
  templateUrl: './tasks-view.html',
  styleUrl: './tasks-view.scss',
})
export class TasksView {}
