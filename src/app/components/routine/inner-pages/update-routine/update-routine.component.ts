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
import {RoutineService} from "../../../../service/routine/routine.service";

@Component({
  selector: 'app-update-routine',
  standalone: true,
  imports: [
     MatButton,
     MatDialogActions,
     MatDialogClose,
     MatDialogContent,
     MatDialogTitle,
     ReactiveFormsModule
    ],
  templateUrl: './update-routine.component.html',
  styleUrl: './update-routine.component.scss'
})
export class UpdateRoutineComponent implements OnInit {

      readonly dialogRef = inject(MatDialogRef<UpdateRoutineComponent>);
      readonly routineService = inject(RoutineService);

      readonly data = inject<any>(MAT_DIALOG_DATA);

      form = new FormGroup({
        patientId: new FormControl('',[Validators.required]),
        date: new FormControl('',[Validators.required]),
        duration: new FormControl('',[Validators.required]),
        dialysisSite: new FormControl('',[Validators.required]),
        daialysisMachineSetting: new FormControl('',[Validators.required]),
        treatmentAdjustment: new FormControl('',[Validators.required]),
      });

      ngOnInit(): void {
        this.form.patchValue({
          patientId: this.data?.routine?.patientId,
          date: this.data?.routine?.date,
          duration: this.data?.routine?.duration,
          dialysisSite: this.data?.routine?.dialysisSite,
          daialysisMachineSetting: this.data?.routine?.daialysisMachineSetting,
          treatmentAdjustment: this.data?.routine?.treatmentAdjustment,
        })
      }

      update() {
        const obj = {
          patientId:this.form.value.patientId,
          date:this.form.value.date,
          duration:this.form.value.duration,
          dialysisSite:this.form.value.dialysisSite,
          daialysisMachineSetting:this.form.value.daialysisMachineSetting,
          treatmentAdjustment:this.form.value.treatmentAdjustment
        }
        this.routineService.update(obj, this.data?.routine?.sessionId).subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close() {
        this.dialogRef.close(false);
      }

}
