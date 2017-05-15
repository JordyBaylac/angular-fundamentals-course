import { FormControl } from '@angular/forms';

export function restrictedWords(restrictedWordsArray: string[]) {

    return (control: FormControl): {[key: string]: any} => {
        if (!restrictedWordsArray) return null;

        let invalidWords = restrictedWordsArray
                            .filter(w => control.value.includes(w));
        return invalidWords && invalidWords.length > 0
                ? { 'restrictedWords': invalidWords.join(', ')}
                : null;
    };

}