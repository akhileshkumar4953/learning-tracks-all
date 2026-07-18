import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { TopicService } from '../../services/topic';

import { Topic } from '../../models/topic.model';

@Component({

  selector: 'app-edit-topic',

  standalone: true,

  imports: [

    CommonModule,

    ReactiveFormsModule

  ],

  templateUrl: './edit-topic.html',

  styleUrl: './edit-topic.css'

})

export class EditTopicComponent implements OnInit {

  topicId!: number;

  topicForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private service: TopicService,

    private route: ActivatedRoute,

    private router: Router

  ) {

    this.topicForm = this.fb.group({

      title: ['', Validators.required],

      category: ['', Validators.required],

      status: ['', Validators.required],

      priority: ['', Validators.required],

      progress: [0],

      notes: ['']

    });

  }

  ngOnInit(): void {

    this.topicId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadTopic();

  }

  loadTopic() {

    this.service.getById(this.topicId)

      .subscribe({

        next: (topic: Topic) => {

          this.topicForm.patchValue(topic);

        },

        error: () => {

          alert('Topic Not Found');

          this.router.navigate(['/dashboard']);

        }

      });

  }

  update() {

    if (this.topicForm.invalid) {

      this.topicForm.markAllAsTouched();

      return;

    }

    this.service.updateTopic(
      this.topicId,
      this.topicForm.value as Topic
    )

    .subscribe({

      next: () => {

        alert('Topic Updated Successfully');

        this.router.navigate(['/dashboard']);

      },

      error: () => {

        alert('Update Failed');

      }

    });

  }

}