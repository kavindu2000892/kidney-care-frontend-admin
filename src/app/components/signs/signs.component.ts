import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewSignsComponent} from "./inner-pages/new-signs/new-signs.component";
import {UpdateSignsComponent} from "./inner-pages/update-signs/update-signs.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {SignsService} from "../../service/signs/signs.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-signs',
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
  templateUrl: './signs.component.html',
  styleUrl: './signs.component.scss'
})
export class SignsComponent implements OnInit {

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
                  private signsService: SignsService,
                  private forexService: ForexService,
                  private clipboardService: ClipboardService) {
      }

      ngOnInit(): void {

        this.searchForm.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(data => {
            this.searchText = data.text;
            this.loadAllSigns();
          })
      }

      openNewSignsForm() {
        let matDialogRef = this.matDialog.open(NewSignsComponent, {
          width: '500px',
          disableClose: true
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllSigns();
          }
        })
      }

      openUpdateSignsForm(signs: any) {
        let matDialogRef = this.matDialog.open(UpdateSignsComponent, {
          width: '500px',
          disableClose: true,
          data: {signs: signs}
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllSigns();
          }
        })
      }



      private loadAllSigns() {
        this.signsService.search(this.page, this.size, this.searchText).subscribe(response => {
          console.log(response);
          this.dataList =  response.data?.dataList;
          this.count = response.data?.count;
        });
      }




      deleteConfirm(item: any) {
        if (confirm('are you sure?')) {
          this.signsService.delete(item?.recordId).subscribe(response => {
            this.loadAllSigns();
          }, error => {
            console.log(error?.error?.message);
          })
        }
      }

      getServerData(data: PageEvent) {
        this.page = data?.pageIndex;
        this.size = data?.pageSize;
        this.loadAllSigns();
      }

      copyText(recordId: any) {
        this.clipboardService.copy(recordId);
      }


}
