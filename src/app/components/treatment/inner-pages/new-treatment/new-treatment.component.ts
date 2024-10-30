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
import {TreatmentService} from "../../../../service/treatment/treatment.service";

@Component({
  selector: 'app-new-treatment',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-treatment.component.html',
  styleUrl: './new-treatment.component.scss'
})
export class NewTreatmentComponent {


    readonly dialogRef = inject(MatDialogRef<NewTreatmentComponent>);
    readonly treatmentService= inject(TreatmentService);

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

    create(){
      const obj={
        patientId:this.form.value.patientId,
        fullName:this.form.value.fullName,
        primaryDiagnosis:this.form.value.primaryDiagnosis,
        secondaryDiagnosis:this.form.value.secondaryDiagnosis,
        frequencyOfDialysis:this.form.value.frequencyOfDialysis,
        dialyzerType:this.form.value.dialyzerType,
        preDialysisMedications:this.form.value.preDialysisMedications,
        postDialysisMedications:this.form.value.postDialysisMedications,
      }
      this.treatmentService.create(obj).subscribe(response=>{
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close(){
      this.dialogRef.close(false);
    }


}
