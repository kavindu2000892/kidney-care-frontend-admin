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
import {NurseService} from "../../../../service/nurse/nurse.service";


@Component({
  selector: 'app-new-nurse',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule
    ],
  templateUrl: './new-nurse.component.html',
  styleUrl: './new-nurse.component.scss'
})
export class NewNurseComponent {


    readonly dialogRef = inject(MatDialogRef<NewNurseComponent>);
    readonly nurseService= inject(NurseService);

    form = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      contact: new FormControl('',[Validators.required]),
      lisenceNumber: new FormControl('',[Validators.required]),
      onCallStatus: new FormControl('',[Validators.required]),
      specialization: new FormControl('',[Validators.required]),
    });

    create(){
      const obj={
        fullName:this.form.value.fullName,
        contact:this.form.value.contact,
        lisenceNumber:this.form.value.lisenceNumber,
        onCallStatus:this.form.value.onCallStatus,
        specialization:this.form.value.specialization
      }
      this.nurseService.create(obj).subscribe(response=>{
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close(){
      this.dialogRef.close(false);
    }


}
