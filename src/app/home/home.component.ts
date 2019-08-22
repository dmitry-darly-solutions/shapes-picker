import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { classNames } from '../shared/shape-class-names.constant';
import { Shape } from '../core/store/reducers/shapes.reducers';
import * as rootReducer from '../core/store';
import * as fromSelectors from '../core/store/selectors';
import * as fromActions from '../core/store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  public opened = true;
  public color = '#000000';
  public isDelete = false;
  public shapes = classNames;
  public items = [];
  public history$: Observable<string[]>;
  public shape$: Observable<Shape>;
  private destroy$ = new Subject();

  constructor(
    private renderer: Renderer2,
    private store: Store<rootReducer.State>
  ) {
    this.subscribeOnReducers();
    this.history$ = this.store.pipe(
      select(fromSelectors.getSelectedShapeColorHistory),
      takeUntil(this.destroy$),
    );
    this.shape$ = this.store.pipe(
      select(fromSelectors.getSelectedShape),
      takeUntil(this.destroy$),
    );
  }

  subscribeOnReducers(): void {
    this.subscribeOnAllShapes();
    this.subscribeOnColorChange();
  }

  drop(event: CdkDragDrop<string[]>): void {
    const element = event.item.element;
    const y = element.nativeElement.offsetTop + event.distance.y;
    const x = event.distance.x - element.nativeElement.offsetWidth + 50;
    const dragPosition = {x, y};
    const shape = {dragPosition, class: event.item.data, color: this.color, colorsHistory: [this.color || '#000000']} as Shape;
    this.store.dispatch(new fromActions.ShapesAddShape(shape));
  }

  setClass(event: boolean, element: any): void {
    if (!event || this.isDelete) {
      return;
    }
    this.renderer.addClass(element.querySelector('.color-picker'), 'position-fix');
  }

  handleClick(event: any, index: number): void {
    const id = this.items[index].id;
    if (!this.isDelete) {
      this.store.dispatch(new fromActions.ShapesSelectShape(id));
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.store.dispatch(new fromActions.ShapesRemoveShape(id));
  }

  dragEnd(event: CdkDragEnd, index: number): void {
    let position: string[] | number[] = event.source.element.nativeElement.style.transform
      .replace('translate3d(', '')
      .slice(0, -1)
      .split(',');
    position = position.map(param => +param.replace('px', ''));
    const dragPosition = {x: position[0], y: position[1]};
    this.store.dispatch(new fromActions.ShapesSaveShapePosition(dragPosition));
  }

  setColor(color: string): void {
    this.store.dispatch(new fromActions.ShapesSaveShapeColor(color));
  }

  undoColor(): void {
    this.store.dispatch(new fromActions.ShapesChangeShapeColorHistory());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  subscribeOnAllShapes(): void {
    this.store.pipe(
      select(fromSelectors.getAllShapes),
      takeUntil(this.destroy$),
    ).subscribe(resp => this.items = resp);
  }

  subscribeOnColorChange(): void {
    this.store.pipe(
      select(fromSelectors.getSelectedShapeColor),
      takeUntil(this.destroy$),
    ).subscribe(resp => this.color = resp);
  }
}
