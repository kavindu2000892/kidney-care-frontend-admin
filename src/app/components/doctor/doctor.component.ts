import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDialog} from "@angular/material/dialog";
import {NewDoctorComponent} from "./inner-pages/new-doctor/new-doctor.component";
import {UpdateDoctorComponent} from "./inner-pages/update-doctor/update-doctor.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {debounceTime} from "rxjs";
import {DoctorService} from "../../service/doctor/doctor.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ClipboardService} from "../../service/clipboard/clipboard.service";
import {ForexService} from "../../service/forex.service";

@Component({
  selector: 'app-doctor',
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
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent implements OnInit {

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
                private doctorService: DoctorService,
                private forexService: ForexService,
                private clipboardService: ClipboardService) {
    }

    ngOnInit(): void {

      this.searchForm.valueChanges
        .pipe(debounceTime(1000))
        .subscribe(data => {
          this.searchText = data.text;
          this.loadAllDoctors();
        })
    }

    openNewDoctorForm() {
      let matDialogRef = this.matDialog.open(NewDoctorComponent, {
        width: '500px',
        disableClose: true
      });

      matDialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.loadAllDoctors();
        }
      })
    }

    openUpdateDoctorForm(doctor: any) {
      let matDialogRef = this.matDialog.open(UpdateDoctorComponent, {
        width: '500px',
        disableClose: true,
        data: {doctor: doctor}
      });

      matDialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.loadAllDoctors();
        }
      })
    }



    private loadAllDoctors() {
      this.doctorService.search(this.page, this.size, this.searchText).subscribe(response => {
        console.log(response);
        this.dataList =  response.data?.dataList;
        this.count = response.data?.count;
      });
    }




    deleteConfirm(item: any) {
      if (confirm('are you sure?')) {
        this.doctorService.delete(item?.doctorId).subscribe(response => {
          this.loadAllDoctors();
        }, error => {
          console.log(error?.error?.message);
        })
      }
    }

    getServerData(data: PageEvent) {
      this.page = data?.pageIndex;
      this.size = data?.pageSize;
      this.loadAllDoctors();
    }

    copyText(doctorId: any) {
      this.clipboardService.copy(doctorId);
    }

}
