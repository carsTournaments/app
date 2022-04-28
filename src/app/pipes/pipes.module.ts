import { NgModule } from '@angular/core';
import {
    DateToTimeAgoPipe,
    FirstLetterPipe,
    ImagePipe,
    LastRoundPipe,
    MomentFormatAgoPipe,
    TruncateTextPipe,
} from '.';

@NgModule({
    declarations: [
        ImagePipe,
        DateToTimeAgoPipe,
        LastRoundPipe,
        MomentFormatAgoPipe,
        TruncateTextPipe,
        FirstLetterPipe,
    ],
    exports: [
        ImagePipe,
        DateToTimeAgoPipe,
        LastRoundPipe,
        MomentFormatAgoPipe,
        TruncateTextPipe,
        FirstLetterPipe,
    ],
})
export class PipesModule {}
