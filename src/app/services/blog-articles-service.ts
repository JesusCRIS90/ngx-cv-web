import { inject, Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

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

  async search(filters: BlogSearchFilters) {
    let query = this.supabase
      .from('blog_articles_metadata')
      .select('*')
      .eq('is_published', true);

    if (filters.keywords?.length) {
      query = query.overlaps('keywords', filters.keywords);
    }

    if (filters.tags?.length) {
      query = query.overlaps('tags', filters.tags);
    }

    if (filters.dateFrom) {
      query = query.gte('published_at', filters.dateFrom);
    }

    if (filters.dateTo) {
      query = query.lte('published_at', filters.dateTo);
    }

    query = query.order('published_at', {
      ascending: filters.ascending ?? false,
    });

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(
        filters.offset,
        filters.offset + (filters.limit ?? 10) - 1
      );
    }

    return query;
  }

  // 🔍 Búsqueda por slug
  async getBySlug(slug: string) {
    return this.supabase
      .from('blog_articles_metadata')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
  }
}
