import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityRequest } from '../../interfaces/activity-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,MatSnackBarModule],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css'
})
export class ActivityFormComponent implements OnInit {
  activityForm : FormGroup;
  matSnackBar = inject(MatSnackBar);
  isEditMode = false;
  activityId?: number;

  constructor(private fb: FormBuilder,
    private activityService : ActivityService,
    private authService: AuthService,
    private router : Router,
    private route : ActivatedRoute
  ) {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      dueDate: ['', Validators.required],
      RealId : [this.authService.getUserRealId(), Validators.required]
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isEditMode = true;
      this.activityId = Number(id);
      this.activityService.getActivity(this.activityId).subscribe(data=> {
        this.activityForm.patchValue(data);
      });
    }
  }
  
  onSubmit(): void {
    if(this.activityForm.invalid){
      return;
    }

    const activity: ActivityRequest = this.activityForm.value;

    

    if(this.isEditMode){
      this.activityService.updateActivity(this.activityId!,activity).subscribe(()=>{
        this.router.navigate(['/activities']);
        this.matSnackBar.open('Task Successfully Edited', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      });
    } else {
      this.activityService.addActivity(activity).subscribe(()=> {
        this.router.navigate(['/activities']);
        this.matSnackBar.open('New Task Added', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      })
    }
  }


}
