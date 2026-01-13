import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-page',
  imports: [],
  templateUrl: './article-page.html',
  styleUrls: ['./article-page.css']
})
export default class ArticlePageComponent {

  slug:string|null = null;
  
  constructor(private route: ActivatedRoute) {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log('Article slug:', this.slug);
  }
}
