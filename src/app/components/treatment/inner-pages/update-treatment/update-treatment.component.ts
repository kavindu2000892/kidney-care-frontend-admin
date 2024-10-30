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
import {TreatmentService} from "../../../../service/treatment/treatment.service";

@Component({
  selector: 'app-update-treatment',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-treatment.component.html',
  styleUrl: './update-treatment.component.scss'
})
export class UpdateTreatmentComponent implements OnInit {

      readonly dialogRef = inject(MatDialogRef<UpdateTreatmentComponent>);
      readonly treatmentService = inject(TreatmentService);

      readonly data = inject<any>(MAT_DIALOG_DATA);

      form = new FormGroup({
        patientId: new FormControl('',[Validators.required]),
        fullName: new FormControl('',[Validators.required]),
        primaryDiagnosis: new FormControl('',[Validators.required]),
        secondaryDiagnosis: new FormControl('',[Validators.required]),
        frequencyOfDialysis: new FormControl('',[Validators.required]),
        dialyzerType: new FormControl('',[Validators.required]),
        preDialysisMedications: new FormControl('',[Validators.required]),
        postDialysisMedications: new FormControl('',[Validators.required]),
      });

      ngOnInit(): void {
        this.form.patchValue({
          patientId: this.data?.treatment?.patientId,
          fullName: this.data?.treatment?.fullName,
          primaryDiagnosis: this.data?.treatment?.primaryDiagnosis,
          secondaryDiagnosis: this.data?.treatment?.secondaryDiagnosis,
          frequencyOfDialysis: this.data?.treatment?.frequencyOfDialysis,
          dialyzerType: this.data?.treatment?.dialyzerType,
          preDialysisMedications: this.data?.treatment?.preDialysisMedications,
          postDialysisMedications: this.data?.treatment?.postDialysisMedications,
        })
      }

      update() {
        const obj = {
          patientId:this.form.value.patientId,
          fullName:this.form.value.fullName,
          primaryDiagnosis:this.form.value.primaryDiagnosis,
          secondaryDiagnosis:this.form.value.secondaryDiagnosis,
          frequencyOfDialysis:this.form.value.frequencyOfDialysis,
          dialyzerType:this.form.value.dialyzerType,
          preDialysisMedications:this.form.value.preDialysisMedications,
          postDialysisMedications:this.form.value.postDialysisMedications,
        }
        this.treatmentService.update(obj, this.data?.treatment?.planId).subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close() {
        this.dialogRef.close(false);
      }

}
