import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewSummeryComponent} from "./inner-pages/new-summery/new-summery.component";
import {UpdateSummeryComponent} from "./inner-pages/update-summery/update-summery.component";
import {FormControl,FormsModule, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {SummeryService} from "../../service/summery/summery.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";


//==============
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { log } from 'console';
import { format } from 'path';


interface Pdf {
  userName: string;
  displayPicture: string;
}

@Component({
  selector: 'app-summery',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReactiveFormsModule,
    NgForOf,
    CurrencyPipe,
    MatPaginator,
    RouterOutlet,//===============
    CommonModule,
    FormsModule

    ],
  templateUrl: './summery.component.html',
  styleUrl: './summery.component.scss'
})
export class SummeryComponent implements OnInit {

     searchText = '';
      page: any = 0;
      size: any = 1;
      count = 0;
      dataList: any[] = [];
      rate: any = 0;

      searchForm: FormGroup = new FormGroup({
        text: new FormControl('')
      });

    //=========================
    userName!: string;
      selectedFile!:File;

      pdfList: Pdf[] = [];
     //============================

      constructor(private matDialog: MatDialog,
                  private summeryService: SummeryService,
                  private forexService: ForexService,
                  private clipboardService: ClipboardService,
                  //=================
                  private httpClient: HttpClient
                  ) {
      }

      ngOnInit(): void {

        this.getPdfList();
        //====================

        this.searchForm.valueChanges
          .pipe(debounceTime(1000))
          .subscribe(data => {
            this.searchText = data.text;
            this.loadAllSummeries();
          })
      }

      openNewSummeryForm() {
        let matDialogRef = this.matDialog.open(NewSummeryComponent, {
          width: '500px',
          disableClose: true
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllSummeries();
          }
        })
      }

      openUpdateSummeryForm(summery: any) {
        let matDialogRef = this.matDialog.open(UpdateSummeryComponent, {
          width: '500px',
          disableClose: true,
          data: {summery: summery}
        });

        matDialogRef.afterClosed().subscribe(response => {
          if (response) {
            this.loadAllSummeries();
          }
        })
      }



      private loadAllSummeries() {
        this.summeryService.search(this.page, this.size, this.searchText).subscribe(response => {
          console.log(response);
          this.dataList =  response.data?.dataList;
          this.count = response.data?.count;
        });
      }




      deleteConfirm(item: any) {
        if (confirm('are you sure?')) {
          this.summeryService.delete(item?.reportId).subscribe(response => {
            this.loadAllSummeries();
          }, error => {
            console.log(error?.error?.message);
          })
        }
      }

      getServerData(data: PageEvent) {
        this.page = data?.pageIndex;
        this.size = data?.pageSize;
        this.loadAllSummeries();
      }

      copyText(reportId: any) {
        this.clipboardService.copy(reportId);
      }

    //=================================

     private getPdfList() {
        this.httpClient.get<Pdf[]>("http://localhost:8002/pdf").subscribe(response => {
          this.pdfList = response;


        }, error => {
          console.log("error occured while fetching pdf list");
        });
      }

      onFileSelected(event:any){
        this.selectedFile=event.target.files[0];
      }
      save():void{

       const formData=new FormData();
       formData.append("name",this.userName);
       formData.append("file",this.selectedFile);

        this.httpClient.post("http://localhost:8002/pdf",formData).subscribe(response=>{
          console.log(response);
          this.getPdfList();
        },error=>{
          console.log(error);
        });
        console.log("saved");

      }



}
