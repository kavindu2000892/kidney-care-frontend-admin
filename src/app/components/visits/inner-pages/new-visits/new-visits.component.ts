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
import {VisitsService} from "../../../../service/visits/visits.service";

@Component({
  selector: 'app-new-visits',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-visits.component.html',
  styleUrl: './new-visits.component.scss'
})
export class NewVisitsComponent {

      readonly dialogRef = inject(MatDialogRef<NewVisitsComponent>);
      readonly visitsService= inject(VisitsService);

      form = new FormGroup({
        patientId: new FormControl('',[Validators.required]),
        preDialysisAssesments: new FormControl('',[Validators.required]),
        postDialysisAssesments: new FormControl('',[Validators.required]),
        actions: new FormControl('',[Validators.required]),
        healthcareTeam: new FormControl('',[Validators.required]),
      });

      create(){
        const obj={
          patientId:this.form.value.patientId,
          preDialysisAssesments:this.form.value.preDialysisAssesments,
          postDialysisAssesments:this.form.value.postDialysisAssesments,
          actions:this.form.value.actions,
          healthcareTeam:this.form.value.healthcareTeam
        }
        this.visitsService.create(obj).subscribe(response=>{
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close(){
        this.dialogRef.close(false);
      }


}
