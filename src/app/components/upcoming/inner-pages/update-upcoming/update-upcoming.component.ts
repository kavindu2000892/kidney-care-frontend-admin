import {Component, inject, model, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpcomingService} from "../../../../service/upcoming/upcoming.service";

@Component({
  selector: 'app-update-upcoming',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-upcoming.component.html',
  styleUrl: './update-upcoming.component.scss'
})
export class UpdateUpcomingComponent implements OnInit {

    readonly dialogRef = inject(MatDialogRef<UpdateUpcomingComponent>);
      readonly upcomingService = inject(UpcomingService);

      readonly data = inject<any>(MAT_DIALOG_DATA);

      form = new FormGroup({
        patientId: new FormControl('',[Validators.required]),
        date: new FormControl('',[Validators.required]),
        time: new FormControl('',[Validators.required]),
        sessionStatus: new FormControl('',[Validators.required]),
        assignedBed: new FormControl('',[Validators.required]),
      });

      ngOnInit(): void {
        this.form.patchValue({
          patientId: this.data?.upcoming?.patientId,
          date: this.data?.upcoming?.date,
          time: this.data?.upcoming?.time,
          sessionStatus: this.data?.upcoming?.sessionStatus,
          assignedBed: this.data?.upcoming?.assignedBed,
        })
      }

      update() {
        const obj = {
          patientId:this.form.value.patientId,
          date:this.form.value.date,
          time:this.form.value.time,
          sessionStatus:this.form.value.sessionStatus,
          assignedBed:this.form.value.assignedBed
        }
        this.upcomingService.update(obj, this.data?.upcoming?.sessionId).subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close() {
        this.dialogRef.close(false);
      }


}
