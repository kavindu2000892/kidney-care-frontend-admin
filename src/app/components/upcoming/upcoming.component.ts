import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewUpcomingComponent} from "./inner-pages/new-upcoming/new-upcoming.component";
import {UpdateUpcomingComponent} from "./inner-pages/update-upcoming/update-upcoming.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {UpcomingService} from "../../service/upcoming/upcoming.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-upcoming',
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
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent implements OnInit {

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
                  private upcomingService: UpcomingService,
                  private forexService: ForexService,
                  private clipboardService: ClipboardService) {
      }

      ngOnInit(): void {

        this.searchForm.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(data => {
            this.searchText = data.text;
            this.loadAllUpcomings();
          })
      }

      openNewUpcomingForm() {
        let matDialogRef = this.matDialog.open(NewUpcomingComponent, {
          width: '500px',
          disableClose: true
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllUpcomings();
          }
        })
      }

      openUpdateUpcomingForm(upcoming: any) {
        let matDialogRef = this.matDialog.open(UpdateUpcomingComponent, {
          width: '500px',
          disableClose: true,
          data: {upcoming: upcoming}
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllUpcomings();
          }
        })
      }



      private loadAllUpcomings() {
        this.upcomingService.search(this.page, this.size, this.searchText).subscribe(response => {
          console.log(response);
          this.dataList =  response.data?.dataList;
          this.count = response.data?.count;
        });
      }




      deleteConfirm(item: any) {
        if (confirm('are you sure?')) {
          this.upcomingService.delete(item?.sessionId).subscribe(response => {
            this.loadAllUpcomings();
          }, error => {
            console.log(error?.error?.message);
          })
        }
      }

      getServerData(data: PageEvent) {
        this.page = data?.pageIndex;
        this.size = data?.pageSize;
        this.loadAllUpcomings();
      }

      copyText(sessionId: any) {
        this.clipboardService.copy(sessionId);
      }

}
