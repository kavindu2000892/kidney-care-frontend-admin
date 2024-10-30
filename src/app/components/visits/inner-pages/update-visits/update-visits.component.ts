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
import {VisitsService} from "../../../../service/visits/visits.service";

@Component({
  selector: 'app-update-visits',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-visits.component.html',
  styleUrl: './update-visits.component.scss'
})
export class UpdateVisitsComponent implements OnInit {


    readonly dialogRef = inject(MatDialogRef<UpdateVisitsComponent>);
    readonly visitsService = inject(VisitsService);

    readonly data = inject<any>(MAT_DIALOG_DATA);

    form = new FormGroup({
      patientId: new FormControl('',[Validators.required]),
      preDialysisAssesments: new FormControl('',[Validators.required]),
      postDialysisAssesments: new FormControl('',[Validators.required]),
      actions: new FormControl('',[Validators.required]),
      healthcareTeam: new FormControl('',[Validators.required]),
    });

    ngOnInit(): void {
      this.form.patchValue({
        patientId: this.data?.visits?.patientId,
        preDialysisAssesments: this.data?.visits?.preDialysisAssesments,
        postDialysisAssesments: this.data?.visits?.postDialysisAssesments,
        actions: this.data?.visits?.actions,
        healthcareTeam: this.data?.visits?.healthcareTeam,
      })
    }

    update() {
      const obj = {
        patientId:this.form.value.patientId,
        preDialysisAssesments:this.form.value.preDialysisAssesments,
        postDialysisAssesments:this.form.value.postDialysisAssesments,
        actions:this.form.value.actions,
        healthcareTeam:this.form.value.healthcareTeam
      }
      this.visitsService.update(obj, this.data?.visits?.visitId).subscribe(response => {
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close() {
      this.dialogRef.close(false);
    }


}
