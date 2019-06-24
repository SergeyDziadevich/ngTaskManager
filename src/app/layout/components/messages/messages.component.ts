import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../core';

// @Ngrx
import { Store } from '@ngrx/store';
import { AppState } from './../../../core/+store';
import * as RouterActions from './../../../core/+store/router/router.actions';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  message = '';

  constructor(
    public messagesService: MessagesService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  onClose() {
    this.store.dispatch(new RouterActions.Go({
      path: [{ outlets: { messages: null } }]
    }));

    this.messagesService.isDisplayed = false;
  }

  onSend() {
    if (this.message) {
      this.messagesService.addMessage(this.message);
      this.message = '';
    }
  }
}
