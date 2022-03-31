import { NgModule } from '@angular/core';
import { DateToTimeAgoPipe, FirstLetterPipe, ImagePipe, TruncateTextPipe } from '.';


@NgModule({
    declarations: [ImagePipe, DateToTimeAgoPipe, TruncateTextPipe, FirstLetterPipe],
    exports: [ImagePipe, DateToTimeAgoPipe, TruncateTextPipe, FirstLetterPipe],
})
export class PipesModule { }
