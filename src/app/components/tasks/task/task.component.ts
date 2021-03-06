import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

import { TaskService } from '../../../shared/utils/services/task.service';
import { ProjectService } from '../../../shared/utils/services/project.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})


export class TaskComponent implements OnInit {

  form: FormGroup;
  projects = [];

  constructor(public service: TaskService, private projectService: ProjectService, private notificationService: NotificationService, public dialogRef: MatDialogRef<TaskComponent>) { }

  ngOnInit() {
    this.service.getTasks();
    
    this.projectService.getProjects().subscribe(
      list => {
        this.projects = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
      }
    );//observable to get data on init
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
        this.service.insertTask(this.service.form.value);
        this.notificationService.success('Submitted Successfullly');
      }else{
        this.service.updateTask(this.service.form.value);
        this.notificationService.success('Updated Successfullly');
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
