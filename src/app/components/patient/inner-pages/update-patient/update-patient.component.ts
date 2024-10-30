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
import {PatientService} from "../../../../service/patient/patient.service";


@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.scss'
})
export class UpdatePatientComponent implements OnInit {

      readonly dialogRef = inject(MatDialogRef<UpdatePatientComponent>);
      readonly patientService = inject(PatientService);

      readonly data = inject<any>(MAT_DIALOG_DATA);

      form = new FormGroup({
        fullName: new FormControl('',[Validators.required]),
        birthDay: new FormControl('',[Validators.required]),
        gender: new FormControl('',[Validators.required]),
        contact: new FormControl('',[Validators.required]),
        diagnosisType: new FormControl('',[Validators.required]),
        surgicalHistory: new FormControl('',[Validators.required]),
        allergies: new FormControl('',[Validators.required]),
      });

      ngOnInit(): void {
        this.form.patchValue({
          fullName: this.data?.patient?.fullName,
          birthDay: this.data?.patient?.birthDay,
          gender: this.data?.patient?.gender,
          contact: this.data?.patient?.contact,
          diagnosisType: this.data?.patient?.diagnosisType,
          surgicalHistory: this.data?.patient?.surgicalHistory,
          allergies: this.data?.patient?.allergies,
        })
      }

      update() {
        const obj = {
          fullName:this.form.value.fullName,
          birthDay:this.form.value.birthDay,
          gender:this.form.value.gender,
          contact:this.form.value.contact,
          diagnosisType:this.form.value.diagnosisType,
          surgicalHistory:this.form.value.surgicalHistory,
          allergies:this.form.value.allergies,
        }
        this.patientService.update(obj, this.data?.patient?.patientId).subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close() {
        this.dialogRef.close(false);
      }

}
