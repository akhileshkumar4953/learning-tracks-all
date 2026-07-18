import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';

import { TopicService } from '../../services/topic';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-add-topic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-topic.html',
  styleUrl: './add-topic.css'
})
export class AddTopicComponent {

  topicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: TopicService,
    private router: Router
  ) {

    this.topicForm = this.fb.group({

      title: ['', Validators.required],

      category: ['', Validators.required],

   status: ['NOT_STARTED'],

      priority: ['MEDIUM'],

      progress: [0],

      notes: ['']

    });

  }

  save() {

    if (this.topicForm.invalid) {

      this.topicForm.markAllAsTouched();

      return;

    }

    this.service
      .createTopic(this.topicForm.value as Topic)
      .subscribe({

        next: () => {

          alert('Topic Added Successfully');

          this.router.navigate(['/dashboard']);

        },

        error: (err) => {

          console.error(err);

          alert('Failed to add topic');

        }

      });

  }

}