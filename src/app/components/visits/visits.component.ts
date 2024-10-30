import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewVisitsComponent} from "./inner-pages/new-visits/new-visits.component";
import {UpdateVisitsComponent} from "./inner-pages/update-visits/update-visits.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {VisitsService} from "../../service/visits/visits.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-visits',
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
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.scss'
})
export class VisitsComponent implements OnInit {

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
                  private visitsService: VisitsService,
                  private forexService: ForexService,
                  private clipboardService: ClipboardService) {
      }

      ngOnInit(): void {

        this.searchForm.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(data => {
            this.searchText = data.text;
            this.loadAllVisits();
          })
      }

      openNewVisitsForm() {
        let matDialogRef = this.matDialog.open(NewVisitsComponent, {
          width: '500px',
          disableClose: true
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllVisits();
          }
        })
      }

      openUpdateVisitsForm(visits: any) {
        let matDialogRef = this.matDialog.open(UpdateVisitsComponent, {
          width: '500px',
          disableClose: true,
          data: {visits: visits}
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllVisits();
          }
        })
      }



      private loadAllVisits() {
        this.visitsService.search(this.page, this.size, this.searchText).subscribe(response => {
          console.log(response);
          this.dataList =  response.data?.dataList;
          this.count = response.data?.count;
        });
      }




      deleteConfirm(item: any) {
        if (confirm('are you sure?')) {
          this.visitsService.delete(item?.visitId).subscribe(response => {
            this.loadAllVisits();
          }, error => {
            console.log(error?.error?.message);
          })
        }
      }

      getServerData(data: PageEvent) {
        this.page = data?.pageIndex;
        this.size = data?.pageSize;
        this.loadAllVisits();
      }

      copyText(visitId: any) {
        this.clipboardService.copy(visitId);
      }

}
