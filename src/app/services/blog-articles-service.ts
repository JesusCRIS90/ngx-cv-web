import { inject, Injectable } from '@angular/core';

import { SupabaseService } from '../services';

export interface BlogSearchFilters {
  keywords?: string[];
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  ascending?: boolean;
  limit?: number;
  offset?: number;
}

@Injectable({ providedIn: 'root' })
export class BlogArticlesService {

  private supabase = inject(SupabaseService).getClient();
  private filters: BlogSearchFilters = {};

  async search() {
    
    let query = this.supabase
      .from('blog_articles_metadata')
      .select('*')
      .eq('is_published', true);

    if (this.filters.keywords?.length) {
      query = query.overlaps('keywords', this.filters.keywords);
    }

    if (this.filters.tags?.length) {
      query = query.overlaps('tags', this.filters.tags);
    }

    if (this.filters.dateFrom) {
      query = query.gte('published_at', this.filters.dateFrom);
    }

    if (this.filters.dateTo) {
      query = query.lte('published_at', this.filters.dateTo);
    }

    query = query.order('published_at', {
      ascending: this.filters.ascending ?? false,
    });

    if (this.filters.limit) {
      query = query.limit(this.filters.limit);
    }

    if (this.filters.offset) {
      query = query.range(
        this.filters.offset,
        this.filters.offset + (this.filters.limit ?? 10) - 1
      );
    }

    return query;
  }

  async getBySlug(slug: string) {
    return this.supabase
      .from('blog_articles_metadata')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
  }

  setFilters(filters: BlogSearchFilters) {
    this.filters = filters;
  }

  clearFilters() {
    this.filters = {};
  }

  async getTagsList(): Promise<Record<string, any>[]> {
    const { data, error } = await this.supabase.rpc('get_all_articles_tags');    
    if (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
    return data || [];
  }
}
