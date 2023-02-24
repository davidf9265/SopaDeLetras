const { transpose } = require('mathjs')
const lodash = require('lodash')

const example_soup = ["S O L", "U N O", "N U T"]; // input example, edit here to change the input
const words2search = ["SUN", "SOL", "LOT", "ONU", "RAY"];

// method to prepare matrix
function soup_middleware(soup){
    let soup_array = [];
    
    soup.map(row => {
        soup_array.push(row.replaceAll(" ", "").split(""));
    });

    return soup_array;
}

function inclusiveRange(start, end) {
    if(start > end){
        return lodash.range(start, end-1);
    }else if (end > start){
        return lodash.range(start, end+1);
    }
}

class Word{
    constructor(word, beginLoc, endLoc){
        this.word = word;
        this.length = word.length;
        this.beginloc = beginLoc; 
        this.endloc = endLoc;
    }

    display(){
        if(this.beginloc[0] == this.endloc[0]){
            // Horizontal
            const arr_indexes = inclusiveRange(this.beginloc[1], this.endloc[1])
            this.word.split('').forEach((letter, index) => {
                console.log(`${letter} - [${this.beginloc[0]}, ${arr_indexes[index]}]`)
            })
        }else if(this.beginloc[1] == this.endloc[1]){
            // Vertical
            const arr_indexes = inclusiveRange(this.beginloc[0], this.endloc[0])
            this.word.split('').forEach((letter, index) => {
                console.log(`${letter} - [${arr_indexes[index]},${this.beginloc[1]}]`)
            })
        }
        return;
    }
}

function main(soup){    
    let splitted_soup = soup_middleware(soup) // ordered matrix
    let transposed_soup = transpose(splitted_soup) //transposed matrix

    let results = []; // array to store all info from found words    
    
    // iterate for each word
    words2search.forEach((word, word_index) => {
        console.log("*************************")
        console.log("Looking for word: " + word)

        // normal matrix
        splitted_soup.map((row, row_index) => {
            if(row.join('').includes(word)){
                // console.log("Found word " + word + " in normal matrix");
                let beginLoc = row.join('').indexOf(word);
                results.push(
                    new Word(word, [row_index,beginLoc], [row_index,beginLoc + (word.length - 1)])
                )
                console.log(results[word_index].word);
                results[word_index].display();
            }
        })

        // normal matrix reversed
        splitted_soup.map((row, row_index) => {            
            let temprow = [...row].reverse().join('');

            if(temprow.includes(word)) {
                // console.log("Found word " + word + " in normal reversed matrix")
                let beginLoc = temprow.indexOf(word);
                results.push(
                    new Word(word, [row_index,beginLoc + (word.length - 1)], [row_index, beginLoc])
                )
                console.log(results[word_index].word);
                results[word_index].display();
            }
        })

        // transposed matrix
        transposed_soup.map((row, row_index) => {
            // console.log(row)
            if(row.join('').includes(word)){
                // console.log("Found word " + word + " in transposed matrix") 
                let beginLoc = row.join('').indexOf(word);
                results.push(
                    new Word(word, [beginLoc,row_index], [beginLoc+(word.length - 1),row_index])
                )
                console.log(results[word_index].word);
                results[word_index].display();
            }
        })

        // transposed matrix
        transposed_soup.map((row) => {
            // console.log(row)
            let temprow = [...row].reverse().join('');
            if(temprow.includes(word)){
                console.log("Found word " + word + " in transposed reversed matrix") 
                let beginLoc = temprow.indexOf(word);
                console.log([beginLoc+word.length,row_index])
                console.log([beginLoc,row_index])
                results.push(
                    new Word(word, [row_index,beginLoc  + (word.length - 1)], [row_index, beginLoc])
                )
                console.log(results[word_index].word);
                results[word_index].display();
            }
        })

        if(!results.some(result => result.word == word)){
            console.log("Word not found")
        }
    });
    
}

main(example_soup); // or edit here to change the input