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
import {DoctorService} from "../../../../service/doctor/doctor.service";

@Component({
  selector: 'app-new-doctor',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
        ],
  templateUrl: './new-doctor.component.html',
  styleUrl: './new-doctor.component.scss'
})
export class NewDoctorComponent {


    readonly dialogRef = inject(MatDialogRef<NewDoctorComponent>);
    readonly doctorService= inject(DoctorService);

    form = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      contact: new FormControl('',[Validators.required]),
      lisenceNumber: new FormControl('',[Validators.required]),
      currentCaseload: new FormControl('',[Validators.required]),
      specialization: new FormControl('',[Validators.required]),
    });

    create(){
      const obj={
        fullName:this.form.value.fullName,
        contact:this.form.value.contact,
        lisenceNumber:this.form.value.lisenceNumber,
        currentCaseload:this.form.value.currentCaseload,
        specialization:this.form.value.specialization
      }
      this.doctorService.create(obj).subscribe(response=>{
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close(){
      this.dialogRef.close(false);
    }

}
