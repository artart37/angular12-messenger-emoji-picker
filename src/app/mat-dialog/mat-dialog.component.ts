import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent, Subscription } from 'rxjs';
import { bestEmoji } from '../api/picked-emoji';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})
export class MatDialogComponent {
  iconStyle = {
    position: "absolute",
    top: "calc(100% - 24px)",
    right: "-2px",
    left: "auto",
    background: "transparent",
    transform: "rotate(-45deg)",
    cursor: "se-resize"
  }
  @ViewChild("textarea") textarea!: ElementRef<HTMLElement>
  mouseMoveSubscription!: Subscription;
  mouseUpSubscription!: Subscription;
  toggler:boolean =true;
  tWidth!: string;
  tHeight!: string;
  emojiArray:string[] = bestEmoji();
  realdate!: Date;
  message!:string;
  constructor(private dialogRef: MatDialogRef<MatDialogComponent>, private renderer:Renderer2){}
  //Custom resizer for my textarea.
  //Slight modifications need to be done for binding to touchstart for mobile screens
  grabber(e: MouseEvent) {
    e.preventDefault();
    const element = this.textarea.nativeElement;
    const minimum_width = 20;
    const minimum_height = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
    original_x = element.getBoundingClientRect().left;
    original_y = element.getBoundingClientRect().top;
    original_mouse_x = e.pageX;
    original_mouse_y = e.pageY;
    this.mouseMoveSubscription = fromEvent(window, "mousemove").subscribe(
      (event: any) => {
        const width = original_width + (event.pageX - original_mouse_x);
        const height = original_height + (event.pageY - original_mouse_y)
        if (width > minimum_width) {
          this.tWidth = width + "px"
        }
        if (height > minimum_height) {
          this.tHeight = height + "px"
        }
      }
    );
    this.mouseUpSubscription = fromEvent(window, "mouseup").subscribe(
      () => {
        this.mouseMoveSubscription.unsubscribe()
      }
    )
  }
trackbyID(index:number){
  return index ? index : Number;
}
close(){
  this.dialogRef.close()
}

emojiPicker(){
  this.toggler = !this.toggler
}

addEmoji(emoji:HTMLElement){
  const  emojiAlt = (<HTMLImageElement>emoji.firstChild).alt
  const  current_value = (<HTMLTextAreaElement>this.textarea.nativeElement).value
  const finalMessage = current_value + emojiAlt
  this.renderer.setProperty(this.textarea.nativeElement, "value", finalMessage)
}

  saveMemory() {
    this.realdate = new Date();
    this.message = (<HTMLTextAreaElement>this.textarea.nativeElement).value
  }
}