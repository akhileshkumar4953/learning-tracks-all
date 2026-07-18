import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { TopicService } from '../../services/topic';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  topics: Topic[] = [];
  filteredTopics: Topic[] = [];

  searchText = '';

  totalTopics = 0;
  completedTopics = 0;
  inProgressTopics = 0;
  pendingTopics = 0;

  constructor(
    private service: TopicService,
    private router: Router
  ) {
    this.loadTopics();
  }

  loadTopics() {

    this.service.getAll().subscribe({

      next: (data) => {

        this.topics = data;
        this.filteredTopics = data;

        this.calculateCards();

      },

      error: err => console.error(err)

    });

  }

  calculateCards() {

    this.totalTopics = this.topics.length;

    this.completedTopics =
      this.topics.filter(t => t.status === 'COMPLETED').length;

    this.inProgressTopics =
      this.topics.filter(t => t.status === 'IN_PROGRESS').length;

    this.pendingTopics =
      this.topics.filter(t => t.status === 'NOT_STARTED').length;

  }

  searchTopics() {

    const value = this.searchText.toLowerCase();

    this.filteredTopics = this.topics.filter(topic =>

      topic.title.toLowerCase().includes(value) ||

      topic.category.toLowerCase().includes(value) ||

      topic.status.toLowerCase().includes(value) ||

      topic.priority.toLowerCase().includes(value)

    );

  }

  editTopic(id: number) {

    this.router.navigate(['/edit-topic', id]);

  }

  deleteTopic(id: number) {

    if (!confirm('Delete this topic?')) {

      return;

    }

    this.service.deleteTopic(id).subscribe({

      next: () => {

        alert('Topic Deleted Successfully');

        this.loadTopics();

      },

      error: () => {

        alert('Delete Failed');

      }

    });

  }

}