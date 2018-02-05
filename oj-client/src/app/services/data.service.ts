import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private _problemSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http:HttpClient) { }

  getProblems(): Observable<Problem[]> {
    this.httpClient.get('api/v1/problems')
    .toPromise()
    .then(res: any) => {
      
    }
  }

  getProblem(id: number): Problem {
    return this.problems.find( (problem) => problem.id === id );
  }

  addProblem(problem: Problem) {
    problem.id = this.problems.length + 1;
    this.problems.push(problem);
  }
}