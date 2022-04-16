import { NgModule } from '@angular/core';
import {
    DateToTimeAgoPipe,
    FirstLetterPipe,
    ImagePipe,
    LastRoundPipe,
    TruncateTextPipe,
} from '.';

@NgModule({
    declarations: [
        ImagePipe,
        DateToTimeAgoPipe,
        LastRoundPipe,
        TruncateTextPipe,
        FirstLetterPipe,
    ],
    exports: [
        ImagePipe,
        DateToTimeAgoPipe,
        LastRoundPipe,
        TruncateTextPipe,
        FirstLetterPipe,
    ],
})
export class PipesModule {}
