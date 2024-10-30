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
import {DoctorService} from "../../../../service/doctor/doctor.service";

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-doctor.component.html',
  styleUrl: './update-doctor.component.scss'
})
export class UpdateDoctorComponent implements OnInit {

    readonly dialogRef = inject(MatDialogRef<UpdateDoctorComponent>);
    readonly doctorService = inject(DoctorService);

    readonly data = inject<any>(MAT_DIALOG_DATA);

    form = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      contact: new FormControl('',[Validators.required]),
      lisenceNumber: new FormControl('',[Validators.required]),
      currentCaseload: new FormControl('',[Validators.required]),
      specialization: new FormControl('',[Validators.required]),
    });

    ngOnInit(): void {
      this.form.patchValue({
        fullName: this.data?.doctor?.fullName,
        contact: this.data?.doctor?.contact,
        lisenceNumber: this.data?.doctor?.lisenceNumber,
        currentCaseload: this.data?.doctor?.currentCaseload,
        specialization: this.data?.doctor?.specialization,
      })
    }

    update() {
      const obj = {
        fullName:this.form.value.fullName,
        contact:this.form.value.contact,
        lisenceNumber:this.form.value.lisenceNumber,
        currentCaseload:this.form.value.currentCaseload,
        specialization:this.form.value.specialization
      }
      this.doctorService.update(obj, this.data?.doctor?.doctorId).subscribe(response => {
        this.dialogRef.close(true);
      }, error => {
        console.log(error?.error?.message);
      })
    }

    close() {
      this.dialogRef.close(false);
    }

}
