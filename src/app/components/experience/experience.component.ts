import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, NgIf, UpperCasePipe } from '@angular/common';
import { DataService, ExperienceItem, EducationItem } from '../../services/data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, UpperCasePipe],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  experiences: ExperienceItem[] = [];
  education: EducationItem[] = [];
  loading = true;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    Promise.all([
      this.data.getExperience(),
      this.data.getEducation()
    ]).then(([experiences, education]) => {
      this.experiences = experiences;
      this.education = education;
      this.loading = false;
    });
  }
}
