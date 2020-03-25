import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { paths } from './app-paths';

@Injectable({
    providedIn: 'root'
})

export class PathResolveService implements Resolve<string | null> {
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): string | null {
        const typoPath = state.url.replace('/','');
        const threshold = this.getThreshold(typoPath);
        const dictionary = Object.values(paths)
            .filter(path => Math.abs(path.length - typoPath.length) < threshold);
    
        if (!dictionary.length) return null;
    
        this.sortByDistances(typoPath, dictionary);
    
        return `/${dictionary[0]}`;
    }
    
    /** After getting user input we calculate the threshold 
       * — the maximum length delta between the input and correct value from paths dictionary. 
       * In my case I decided to use 3 for words less than 5 characters, otherwise 5.
       * This allows filtering the dictionary for values that are hard to recognize as a typo. */
    getThreshold(path: string): number {
        if (path.length < 5) return 3;
    
        return 5;
    }
    
    /** Then if we still have any possible entry we sort the dictionary by the Levenshtein distance to the input value. 
    * After that, we return the first value from the sorted dictionary. */
    
    /** We created pathsDistance hashmap to store calculated distances values. 
    * By doing that we calculate the distance only once for each item in the dictionary.  
    * Then we used that mapping to sort the values */
    sortByDistances(typoPath: string, dictionary: string[]) {
        const pathsDistance = {} as { [name: string]: number };

        dictionary.sort((a, b) => {
            if (!(a in pathsDistance)) {
            pathsDistance[a] = this.levenshtein(a, typoPath);
            }
            if (!(b in pathsDistance)) {
            pathsDistance[b] = this.levenshtein(b, typoPath);
            }

            return pathsDistance[a] - pathsDistance[b];
        });
        }
        
        /**
         * Calculate the levenshtein distance of two strings.
         * See https://en.wikipedia.org/wiki/Levenshtein_distance.
         * Based off https://gist.github.com/andrei-m/982927 (for using the faster dynamic programming
         * version).
         *
         * @param a String a.
         * @param b String b.
         * @returns A number that represents the distance between the two strings. The greater the number
         *   the more distant the strings are from each others.
         */
        levenshtein(a: string, b: string): number {
        if (a.length == 0) {
            return b.length;
        }
        if (b.length == 0) {
            return a.length;
        }

        const matrix = [];

        // increment along the first column of each row
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                matrix[i - 1][j - 1] + 1, // substitution
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1, // deletion
                );
            }
            }
        }

        return matrix[b.length][a.length];
    }
}