import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PatientService} from "../../../../service/patient/patient.service";

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-patient.component.html',
  styleUrl: './new-patient.component.scss'
})
export class NewPatientComponent {


    readonly dialogRef = inject(MatDialogRef<NewPatientComponent>);
    readonly patientService= inject(PatientService);

    form = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      birthDay: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      contact: new FormControl('',[Validators.required]),
      diagnosisType: new FormControl('',[Validators.required]),
      surgicalHistory: new FormControl('',[Validators.required]),
      allergies: new FormControl('',[Validators.required]),
    });

    create(){
      const obj={
        fullName:this.form.value.fullName,
        birthDay:this.form.value.birthDay,
        gender:this.form.value.gender,
        contact:this.form.value.contact,
        diagnosisType:this.form.value.diagnosisType,
        surgicalHistory:this.form.value.surgicalHistory,
        allergies:this.form.value.allergies,
      }
      this.patientService.create(obj).subscribe(response=>{
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close(){
      this.dialogRef.close(false);
    }

}
