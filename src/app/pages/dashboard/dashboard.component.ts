import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task [];
  ptasks: Task [];
  color: string;

  constructor(private service: TaskService) { }

  ngOnInit() {

    this.service.getSummaryTasks().subscribe(
      list => {
        this.tasks = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
        this.summaryPriority(this.tasks);
      }
    );//observable to get data on init

  }

  customOptions: OwlOptions = {
    items: 4,
    loop: true,
    margin: 15,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 5000,
    responsive: {
        0: {
            items: 1
        },
        479: {
            items: 1
        },
        768: {
            items: 2
        },
        979: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
  }

  summaryPriority(tasks){

    this.ptasks = tasks.map(element => {
      let ets = element.deadlineTimeStamp - Date.now();
      let day2 = 172800000;
      let day4 = 345600000;
      if (ets < 0){ 
        element.deadline = 'overdue';
        element.priority = 'overdue';
      }else if(ets > 0 && ets < day2){
        element.deadline = 'red';
      }else if(ets > day2 && ets < day4){
        element.deadline = 'yellow';
      }else{
        element.deadline = 'green';
      }
      return element;
    });

  }

}
