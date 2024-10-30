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
import {NurseService} from "../../../../service/nurse/nurse.service";

@Component({
  selector: 'app-update-nurse',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule
    ],
  templateUrl: './update-nurse.component.html',
  styleUrl: './update-nurse.component.scss'
})
export class UpdateNurseComponent implements OnInit {

      readonly dialogRef = inject(MatDialogRef<UpdateNurseComponent>);
      readonly nurseService = inject(NurseService);

      readonly data = inject<any>(MAT_DIALOG_DATA);

      form = new FormGroup({
        fullName: new FormControl('',[Validators.required]),
        contact: new FormControl('',[Validators.required]),
        lisenceNumber: new FormControl('',[Validators.required]),
        onCallStatus: new FormControl('',[Validators.required]),
        specialization: new FormControl('',[Validators.required]),
      });

      ngOnInit(): void {
        this.form.patchValue({
          fullName: this.data?.nurse?.fullName,
          contact: this.data?.nurse?.contact,
          lisenceNumber: this.data?.nurse?.lisenceNumber,
          onCallStatus: this.data?.nurse?.onCallStatus,
          specialization: this.data?.nurse?.specialization,
        })
      }

      update() {
        const obj = {
          fullName:this.form.value.fullName,
          contact:this.form.value.contact,
          lisenceNumber:this.form.value.lisenceNumber,
          onCallStatus:this.form.value.onCallStatus,
          specialization:this.form.value.specialization
        }
        this.nurseService.update(obj, this.data?.nurse?.nurseId).subscribe(response => {
          this.dialogRef.close(true);
        }, error => {
          console.log(error?.error?.message);
        })
      }

      close() {
        this.dialogRef.close(false);
      }

}
