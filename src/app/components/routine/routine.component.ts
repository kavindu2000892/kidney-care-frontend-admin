import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewRoutineComponent} from "./inner-pages/new-routine/new-routine.component";
import {UpdateRoutineComponent} from "./inner-pages/update-routine/update-routine.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {RoutineService} from "../../service/routine/routine.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReactiveFormsModule,
    NgForOf,
    CurrencyPipe,
    MatPaginator
    ],
  templateUrl: './routine.component.html',
  styleUrl: './routine.component.scss'
})
export class RoutineComponent implements OnInit {

      searchText = '';
      page: any = 0;
      size: any = 1;
      count = 0;
      dataList: any[] = [];
      rate: any = 0;

      searchForm: FormGroup = new FormGroup({
        text: new FormControl('')
      });

      constructor(private matDialog: MatDialog,
                  private routineService: RoutineService,
                  private forexService: ForexService,
                  private clipboardService: ClipboardService) {
      }

      ngOnInit(): void {

        this.searchForm.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(data => {
            this.searchText = data.text;
            this.loadAllRoutines();
          })
      }

      openNewRoutineForm() {
        let matDialogRef = this.matDialog.open(NewRoutineComponent, {
          width: '500px',
          disableClose: true
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllRoutines();
          }
        })
      }

      openUpdateRoutineForm(routine: any) {
        let matDialogRef = this.matDialog.open(UpdateRoutineComponent, {
          width: '500px',
          disableClose: true,
          data: {routine: routine}
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllRoutines();
          }
        })
      }



      private loadAllRoutines() {
        this.routineService.search(this.page, this.size, this.searchText).subscribe(response => {
          console.log(response);
          this.dataList =  response.data?.dataList;
          this.count = response.data?.count;
        });
      }




      deleteConfirm(item: any) {
        if (confirm('are you sure?')) {
          this.routineService.delete(item?.sessionId).subscribe(response => {
            this.loadAllRoutines();
          }, error => {
            console.log(error?.error?.message);
          })
        }
      }

      getServerData(data: PageEvent) {
        this.page = data?.pageIndex;
        this.size = data?.pageSize;
        this.loadAllRoutines();
      }

      copyText(sessionId: any) {
        this.clipboardService.copy(sessionId);
      }

}
