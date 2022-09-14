import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { IonContent, IonList, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  data = null;

  opts = {
    slidesOffsetBefore: 30,
    slidesPerView: 2.6,
    freeMode: true,
  };

  categorySlidesVisible = false;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>;

  activeCategory = 0;
  listElements = [];

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}
  ngAfterViewInit(): void {
    this.lists.changes.subscribe((_) => {
      this.listElements = this.lists.toArray();
      console.log(this.listElements);
    });

    const headerHeight = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty(
      '--header-position',
      `calc(env(safe-area-inset-top) + ${headerHeight}px`
    );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering

  ngOnInit() {
    this.http
      .get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json')
      .subscribe((res: any) => {
        this.data = res;
        console.log(res);
      });
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 650;
  }

  selectCategory(i) {
    const child = this.listElements[i].nativeElement;
    this.content.scrollToPoint(0, child.offsetTop - 80, 1000);
  }
}
