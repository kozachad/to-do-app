import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { AuthService } from "./auth.service";
import { ActivityRequest } from "../interfaces/activity-request";


@Injectable({
    providedIn: 'root'
  })

  export class ActivityService {
    private apiUrl = 'https://localhost:7116/TodoApi/activities';

    constructor(private http:HttpClient, private authService: AuthService) { }
    
    getUserActivities(): Observable<ActivityRequest[]>{
        const realId = this.authService.getUserRealId();
        if(realId == null){
            throw new Error('User is not logged in');
        }
        const token = this.authService.getToken();
        let header = new HttpHeaders().set("Authorization","bearer "+token)
        return this.http.get<ActivityRequest[]>(`${this.apiUrl}/user?RealId=`+ realId,{headers:header});
    }

    getActivity(Id: number): Observable<ActivityRequest> {
        const token = this.authService.getToken();
        let header = new HttpHeaders().set("Authorization","bearer "+token)
        return this.http.get<ActivityRequest>(`${this.apiUrl}/getid?id=`+Id, {headers:header});
    }
    
    addActivity(activity: ActivityRequest): Observable<ActivityRequest> {
        const realId = this.authService.getUserRealId();
        if(realId == null){
            throw new Error('User is not logged in');
        }
        const token = this.authService.getToken();
        let header = new HttpHeaders().set("Authorization","bearer "+token)
        return this.http.post<ActivityRequest>(this.apiUrl, activity,{headers:header});
    }

    updateActivity(Id: number, activity: ActivityRequest): Observable<ActivityRequest> {
        const token = this.authService.getToken();
        let header = new HttpHeaders().set("Authorization","bearer "+token)
        return this.http.put<ActivityRequest>(`${this.apiUrl}/edit?id=`+Id, activity,{headers:header});
    }

    deleteActivity(Id: number): Observable<void> {
        const token = this.authService.getToken();
        let header = new HttpHeaders().set("Authorization","bearer "+token)
        return this.http.delete<void>(`${this.apiUrl}/delete?id=`+Id,{headers:header});
    }
  }

export { ActivityRequest };
