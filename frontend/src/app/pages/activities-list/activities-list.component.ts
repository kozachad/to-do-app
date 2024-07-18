import { Component, OnInit, inject } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivityRequest } from '../../interfaces/activity-request';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css'],
  standalone: true,
  imports: [CommonModule,RouterLink,MatSnackBarModule]
})
export class ActivitiesListComponent implements OnInit {
  activities: ActivityRequest[] = [];
  matSnackBar = inject(MatSnackBar);

  constructor(private activityService: ActivityService, 
    private router: Router,
    private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.activityService.getUserActivities().subscribe(data => {
      this.activities = data;
    });
  }

  editActivity(Id: number): void {
    this.router.navigate(['/activities/edit/', Id]);
  }

  deleteActivity(Id: number): void {
    this.activityService.deleteActivity(Id).subscribe(() => {
      this.activities = this.activities.filter(activity => activity.id !== Id);
      this.matSnackBar.open('Task Successfully Deleted', 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }
}
