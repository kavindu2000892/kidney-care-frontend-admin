import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewTreatmentComponent} from "./inner-pages/new-treatment/new-treatment.component";
import {UpdateTreatmentComponent} from "./inner-pages/update-treatment/update-treatment.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {TreatmentService} from "../../service/treatment/treatment.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-treatment',
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
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.scss'
})
export class TreatmentComponent implements OnInit {

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
                  private treatmentService: TreatmentService,
                  private forexService: ForexService,
                  private clipboardService: ClipboardService) {
      }

      ngOnInit(): void {

        this.searchForm.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(data => {
            this.searchText = data.text;
            this.loadAllTreatments();
          })
      }

      openNewTreatmentForm() {
        let matDialogRef = this.matDialog.open(NewTreatmentComponent, {
          width: '500px',
          disableClose: true
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllTreatments();
          }
        })
      }

      openUpdateTreatmentsForm(treatment: any) {
        let matDialogRef = this.matDialog.open(UpdateTreatmentComponent, {
          width: '500px',
          disableClose: true,
          data: {treatment: treatment}
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllTreatments();
          }
        })
      }



      private loadAllTreatments() {
        this.treatmentService.search(this.page, this.size, this.searchText).subscribe(response => {
          console.log(response);
          this.dataList =  response.data?.dataList;
          this.count = response.data?.count;
        });
      }




      deleteConfirm(item: any) {
        if (confirm('are you sure?')) {
          this.treatmentService.delete(item?.planId).subscribe(response => {
            this.loadAllTreatments();
          }, error => {
            console.log(error?.error?.message);
          })
        }
      }

      getServerData(data: PageEvent) {
        this.page = data?.pageIndex;
        this.size = data?.pageSize;
        this.loadAllTreatments();
      }

      copyText(planId: any) {
        this.clipboardService.copy(planId);
      }

}
