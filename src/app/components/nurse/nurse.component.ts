import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewNurseComponent} from "./inner-pages/new-nurse/new-nurse.component";
import {UpdateNurseComponent} from "./inner-pages/update-nurse/update-nurse.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {NurseService} from "../../service/nurse/nurse.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-nurse',
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
  templateUrl: './nurse.component.html',
  styleUrl: './nurse.component.scss'
})
export class NurseComponent implements OnInit {

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
                  private nurseService: NurseService,
                  private forexService: ForexService,
                  private clipboardService: ClipboardService) {
      }

      ngOnInit(): void {

        this.searchForm.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(data => {
            this.searchText = data.text;
            this.loadAllNurses();
          })
      }

      openNewNurseForm() {
        let matDialogRef = this.matDialog.open(NewNurseComponent, {
          width: '500px',
          disableClose: true
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllNurses();
          }
        })
      }

      openUpdateNurseForm(nurse: any) {
        let matDialogRef = this.matDialog.open(UpdateNurseComponent, {
          width: '500px',
          disableClose: true,
          data: {nurse: nurse}
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllNurses();
          }
        })
      }



      private loadAllNurses() {
        this.nurseService.search(this.page, this.size, this.searchText).subscribe(response => {
          console.log(response);
          this.dataList =  response.data?.dataList;
          this.count = response.data?.count;
        });
      }




      deleteConfirm(item: any) {
        if (confirm('are you sure?')) {
          this.nurseService.delete(item?.nurseId).subscribe(response => {
            this.loadAllNurses();
          }, error => {
            console.log(error?.error?.message);
          })
        }
      }

      getServerData(data: PageEvent) {
        this.page = data?.pageIndex;
        this.size = data?.pageSize;
        this.loadAllNurses();
      }

      copyText(nurseId: any) {
        this.clipboardService.copy(nurseId);
      }




}
