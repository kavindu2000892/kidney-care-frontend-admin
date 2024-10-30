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
import {UpcomingService} from "../../../../service/upcoming/upcoming.service";

@Component({
  selector: 'app-new-upcoming',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-upcoming.component.html',
  styleUrl: './new-upcoming.component.scss'
})
export class NewUpcomingComponent {


    readonly dialogRef = inject(MatDialogRef<NewUpcomingComponent>);
    readonly upcomingService= inject(UpcomingService);

    form = new FormGroup({
      patientId: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      time: new FormControl('',[Validators.required]),
      sessionStatus: new FormControl('',[Validators.required]),
      assignedBed: new FormControl('',[Validators.required]),
    });

    create(){
      const obj={
        patientId:this.form.value.patientId,
        date:this.form.value.date,
        time:this.form.value.time,
        sessionStatus:this.form.value.sessionStatus,
        assignedBed:this.form.value.assignedBed
      }
      this.upcomingService.create(obj).subscribe(response=>{
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close(){
      this.dialogRef.close(false);
    }

}
