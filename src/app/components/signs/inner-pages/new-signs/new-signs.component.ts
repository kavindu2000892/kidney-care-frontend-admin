
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
import {SignsService} from "../../../../service/signs/signs.service";

@Component({
  selector: 'app-new-signs',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-signs.component.html',
  styleUrl: './new-signs.component.scss'
})
export class NewSignsComponent {

      readonly dialogRef = inject(MatDialogRef<NewSignsComponent>);
      readonly signsService= inject(SignsService);

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

      create(){
        const obj={
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
        this.signsService.create(obj).subscribe(response=>{
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close(){
        this.dialogRef.close(false);
      }

}
