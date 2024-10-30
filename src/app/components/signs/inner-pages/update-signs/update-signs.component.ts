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
import {SignsService} from "../../../../service/signs/signs.service";

@Component({
  selector: 'app-update-signs',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-signs.component.html',
  styleUrl: './update-signs.component.scss'
})
export class UpdateSignsComponent implements OnInit {

      readonly dialogRef = inject(MatDialogRef<UpdateSignsComponent>);
      readonly signsService = inject(SignsService);

      readonly data = inject<any>(MAT_DIALOG_DATA);

      form = new FormGroup({
        patientId: new FormControl('',[Validators.required]),
        date: new FormControl('',[Validators.required]),
        bloodPressure: new FormControl('',[Validators.required]),
        heartRate: new FormControl('',[Validators.required]),
        respiratoryRate: new FormControl('',[Validators.required]),
        bloodOxygenSaturation: new FormControl('',[Validators.required]),
        bodyTemperature: new FormControl('',[Validators.required]),
        bodyWeight: new FormControl('',[Validators.required]),
        patientSymptoms: new FormControl('',[Validators.required]),
      });

      ngOnInit(): void {
        this.form.patchValue({
          patientId: this.data?.signs?.patientId,
          date: this.data?.signs?.date,
          bloodPressure: this.data?.signs?.bloodPressure,
          heartRate: this.data?.signs?.heartRate,
          respiratoryRate: this.data?.signs?.respiratoryRate,
          bloodOxygenSaturation: this.data?.signs?.bloodOxygenSaturation,
          bodyTemperature: this.data?.signs?.bodyTemperature,
          bodyWeight: this.data?.signs?.bodyWeight,
          patientSymptoms: this.data?.signs?.patientSymptoms,
        })
      }

      update() {
        const obj = {
         patientId:this.form.value.patientId,
         date:this.form.value.date,
         bloodPressure:this.form.value.bloodPressure,
         heartRate:this.form.value.heartRate,
         respiratoryRate:this.form.value.respiratoryRate,
         bloodOxygenSaturation:this.form.value.bloodOxygenSaturation,
         bodyTemperature:this.form.value.bodyTemperature,
         bodyWeight:this.form.value.bodyWeight,
         patientSymptoms:this.form.value.patientSymptoms,
        }
        this.signsService.update(obj, this.data?.signs?.recordId).subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close() {
        this.dialogRef.close(false);
      }

}
