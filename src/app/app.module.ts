import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material Modules
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
//My Dialog component
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
//Emoji Converter Pipe
import { EmojiPipe } from './emoji-converter-pipe/emoji.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MatDialogComponent,
    EmojiPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [EmojiPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
