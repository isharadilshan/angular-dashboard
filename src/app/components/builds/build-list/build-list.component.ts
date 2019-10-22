import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { BuildService } from 'src/app/shared/utils/build.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { BuildComponent } from '../build/build.component';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss']
})
export class BuildListComponent implements OnInit {

  constructor(public authService: AuthService, private service: BuildService, private dialog: MatDialog, private notificationService: NotificationService) { }

  listData: MatTableDataSource<Build>;
  displayedColumns: string[] = ["server","project","buildDate","buildTime","buildExpireDate","buildExpireTime","buildVersion","buildURL","actions"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getBuilds().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    );
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(BuildComponent,dialogConfig);
  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(BuildComponent,dialogConfig);
  }

  onDelete($key){
    if(confirm('Are you sure to delete this record ?')){
      this.service.deleteBuild($key);
      this.notificationService.warn('Deleted Successfully');
    }
  }

  //SOLID Principle 
  signOut(){
    try{
      this.authService.signOut();
    }catch(err){
      console.log("Error occurs when trying to sign out ///"+err);
    }
  }

}

export class Build {
  server:string;
  project:string;
  buildDate:string;
  buildTime: string;
  buildExpireDate: string;
  buildExpireTime: string;
  buildVersion: string;
  buildURL: string;
}