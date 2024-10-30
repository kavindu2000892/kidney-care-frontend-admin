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
import {SummeryService} from "../../../../service/summery/summery.service";

@Component({
  selector: 'app-update-summery',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-summery.component.html',
  styleUrl: './update-summery.component.scss'
})
export class UpdateSummeryComponent implements OnInit {

      readonly dialogRef = inject(MatDialogRef<UpdateSummeryComponent>);
      readonly summeryService = inject(SummeryService);

      readonly data = inject<any>(MAT_DIALOG_DATA);

      form = new FormGroup({
        patientId: new FormControl('',[Validators.required]),
        reportDate: new FormControl('',[Validators.required]),
        doctorInCharge: new FormControl('',[Validators.required]),
        treatmentHistory: new FormControl('',[Validators.required]),
        dialysisSessionHistory: new FormControl('',[Validators.required]),
        symptms: new FormControl('',[Validators.required]),
      });

      ngOnInit(): void {
        this.form.patchValue({
          patientId: this.data?.summery?.patientId,
          reportDate: this.data?.summery?.reportDate,
          doctorInCharge: this.data?.summery?.doctorInCharge,
          treatmentHistory: this.data?.summery?.treatmentHistory,
          dialysisSessionHistory: this.data?.summery?.dialysisSessionHistory,
          symptms: this.data?.summery?.symptms,
        })
      }

      update() {
        const obj = {
          patientId:this.form.value.patientId,
          reportDate:this.form.value.reportDate,
          doctorInCharge:this.form.value.doctorInCharge,
          treatmentHistory:this.form.value.treatmentHistory,
          dialysisSessionHistory:this.form.value.dialysisSessionHistory,
          symptms:this.form.value.symptms,
        }
        this.summeryService.update(obj, this.data?.summery?.reportId).subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close() {
        this.dialogRef.close(false);
      }


}
