import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Topic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ==========================
  // Get All Topics
  // ==========================
  getAll(): Observable<Topic[]> {

    return this.http.get<Topic[]>(
      this.api + '/topics'
    );

  }

  // ==========================
  // Create Topic
  // ==========================
  createTopic(topic: Topic): Observable<Topic> {

    return this.http.post<Topic>(
      this.api + '/topics',
      topic
    );

  }

  // ==========================
  // Get Topic By ID
  // ==========================
  getById(id:number):Observable<Topic>{

    return this.http.get<Topic>(
      `${this.api}/topics/${id}`
    );

  }

  // ==========================
  // Update Topic
  // ==========================
  updateTopic(id:number,topic:Topic):Observable<Topic>{

    return this.http.put<Topic>(
      `${this.api}/topics/${id}`,
      topic
    );

  }

  // ==========================
  // Delete Topic
  // ==========================
deleteTopic(id: number) {

  return this.http.delete(
    `${this.api}/topics/${id}`
  );

}

}