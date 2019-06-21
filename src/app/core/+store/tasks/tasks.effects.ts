import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// ngrx
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap } from 'rxjs/operators';

import { TaskPromiseService } from './../../../tasks/services';
import { TaskModel } from '../../../tasks/models/task.model';

@Injectable()
export class TasksEffects {
  constructor( 
    private actions$: Actions,
    private router: Router,
    private taskPromiseService: TaskPromiseService
  ) {
    console.log('[TASKS EFFECTS]');
  }

  @Effect()
  getTasks$: Observable<Action> = this.actions$.pipe(
    // Instead of ofType<TasksActions.GetTasks>(...) you can use ofType(...)
    // It's optional.
    // Specify the action type to allow type-safe mapping to other data on the action,
    // including payload
    ofType<TasksActions.GetTasks>(TasksActions.TasksActionTypes.GET_TASKS),
    switchMap((action: TasksActions.GetTasks) =>
      this.taskPromiseService
        .getTasks()
        .then(tasks => new TasksActions.GetTasksSuccess(tasks))
        .catch(err => new TasksActions.GetTasksError(err))
    )
  );

  @Effect()
  getTask$: Observable<Action> = this.actions$.pipe(
    ofType<TasksActions.GetTask>(TasksActions.TasksActionTypes.GET_TASK),
    pluck('payload'),
    switchMap(payload =>
      this.taskPromiseService
        .getTask(+payload)
        .then(task => new TasksActions.GetTaskSuccess(task))
        .catch(err => new TasksActions.GetTaskError(err))
    )
  );	

  @Effect()
  updateTask$: Observable<Action> = this.actions$.pipe(
      ofType<TasksActions.UpdateTask>(TasksActions.TasksActionTypes.UPDATE_TASK),
      pluck('payload'),
      concatMap((payload: TaskModel) =>
        this.taskPromiseService
          .updateTask(payload)
          .then(task => {
            this.router.navigate(['/home']);
            return new TasksActions.UpdateTaskSuccess(task);
          })
          .catch(err => new TasksActions.UpdateTaskError(err))
      )
  );

}