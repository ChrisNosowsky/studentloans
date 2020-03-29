import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {UserService} from '../../user.service';
import {CommonService} from '../../common.service';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoModal {
  @Input() public UserData;
  constructor(public activeModal: NgbActiveModal, private http: CommonService, private user: UserService) {}
  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }
}
