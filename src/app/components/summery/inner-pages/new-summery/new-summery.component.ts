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
import {SummeryService} from "../../../../service/summery/summery.service";

@Component({
  selector: 'app-new-summery',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-summery.component.html',
  styleUrl: './new-summery.component.scss'
})
export class NewSummeryComponent {


    readonly dialogRef = inject(MatDialogRef<NewSummeryComponent>);
    readonly summeryService= inject(SummeryService);

    form = new FormGroup({
      patientId: new FormControl('',[Validators.required]),
      reportDate: new FormControl('',[Validators.required]),
      doctorInCharge: new FormControl('',[Validators.required]),
      treatmentHistory: new FormControl('',[Validators.required]),
      dialysisSessionHistory: new FormControl('',[Validators.required]),
      symptms: new FormControl('',[Validators.required]),
    });

    create(){
      const obj={
        patientId:this.form.value.patientId,
        reportDate:this.form.value.reportDate,
        doctorInCharge:this.form.value.doctorInCharge,
        treatmentHistory:this.form.value.treatmentHistory,
        dialysisSessionHistory:this.form.value.dialysisSessionHistory,
        symptms:this.form.value.symptms,
      }
      this.summeryService.create(obj).subscribe(response=>{
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close(){
      this.dialogRef.close(false);
    }


}
