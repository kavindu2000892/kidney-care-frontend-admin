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
import {RoutineService} from "../../../../service/routine/routine.service";

@Component({
  selector: 'app-new-routine',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-routine.component.html',
  styleUrl: './new-routine.component.scss'
})
export class NewRoutineComponent {

      readonly dialogRef = inject(MatDialogRef<NewRoutineComponent>);
      readonly routineService= inject(RoutineService);

      form = new FormGroup({
        patientId: new FormControl('',[Validators.required]),
        date: new FormControl('',[Validators.required]),
        duration: new FormControl('',[Validators.required]),
        dialysisSite: new FormControl('',[Validators.required]),
        daialysisMachineSetting: new FormControl('',[Validators.required]),
        treatmentAdjustment: new FormControl('',[Validators.required]),
      });

      create(){
        const obj={
          patientId:this.form.value.patientId,
          date:this.form.value.date,
          duration:this.form.value.duration,
          dialysisSite:this.form.value.dialysisSite,
          daialysisMachineSetting:this.form.value.daialysisMachineSetting,
          treatmentAdjustment:this.form.value.treatmentAdjustment
        }
        this.routineService.create(obj).subscribe(response=>{
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close(){
        this.dialogRef.close(false);
      }


}
