import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demo: string;
  code: string;
  order: number;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  active: boolean;
  description: string;
  highlights: string[];
  tags: string[];
  order: number;
}

export interface EducationItem {
  id: number;
  type: string;
  title: string;
  institution: string;
  icon: string;
  order: number;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getProjects(): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .order('order');
    if (error) { console.error('projects:', error.message); return []; }
    return data as Project[];
  }

  async getExperience(): Promise<ExperienceItem[]> {
    const { data, error } = await this.supabase
      .from('experience')
      .select('*')
      .order('order');
    if (error) { console.error('experience:', error.message); return []; }
    return data as ExperienceItem[];
  }

  async getEducation(): Promise<EducationItem[]> {
    const { data, error } = await this.supabase
      .from('education')
      .select('*')
      .order('order');
    if (error) { console.error('education:', error.message); return []; }
    return data as EducationItem[];
  }
}
