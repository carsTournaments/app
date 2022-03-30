import { NgModule } from '@angular/core';
import { FirstLetterPipe } from './fist-letter-case.pipe';
import { ImagePipe } from './image.pipe';
import { DateToTimeAgoPipe } from './timeago.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

@NgModule({
    declarations: [ImagePipe, DateToTimeAgoPipe, TruncateTextPipe, FirstLetterPipe],
    exports: [ImagePipe, DateToTimeAgoPipe, TruncateTextPipe, FirstLetterPipe],
})
export class PipesModule { }
