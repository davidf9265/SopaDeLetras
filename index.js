const {transpose } = require('mathjs')

const example_soup = ["S O L", "U N O", "N U T"];


const words2search = ["SUN", "SOL", "LOT", "ONU", "RAY"];

function soup_middleware(soup){
    let soup_array = [];
    
    soup.map(row => {
        soup_array.push(row.replaceAll(" ", "").split(""));
    });

    return soup_array;
}

class Word{
    constructor(word, beginLoc, endLoc){
        this.word = word;
        this.length = word.length;
        this.beginloc = beginLoc; 
        this.endloc = endLoc;
    }
}

//     identify(soup){
//         if(w_to_find == this.word){
//             this.word.map(letter => {
//                 soup.map(row => {
//                     row.
//             return true;
//         }else{
//             return false;
//         }
//     }
// }

function main(soup){
    // console.log("Hello World");
    // console.log(example_soup);
    // console.log(example_soup[0][0]);
    // console.log(example_soup[1]);
    // console.log(example_soup[2]);

    
    let splitted_soup = soup_middleware(soup) // ordered matrix
    let transposed_soup = transpose(splitted_soup) //transposed matrix

    console.log(transposed_soup)

    let results = [];

    // words2search.some(word => {
    //     console.log(word);
    //     soup_middleware(splitted_soup).some(row => {
    //         console.log(row);
    //         row.some(letter => {
    //             console.log(letter);
    //             if(letter == word[0]){
    //                 console.log("Found letter");
    //             }
    //         })
    //     }
    // });

    // alphabet till m
    // let wowo = ['a','b','c','d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'].map(letter => letter.toUpperCase()).join('');
    
    
    // iterate for each word
    words2search.forEach(word => {
        console.log("Looking for word: " + word)
        // normal matrix
        splitted_soup.map((row, row_index) => {
            if(row.join('').includes(word)){
                console.log("Found word " + word + " in normal matrix");
                let beginLoc = row.join('').indexOf(word);
                console.log([row_index,beginLoc])
                console.log([row_index,beginLoc + word.length])
                results.push(
                    new Word(word, [row_index,beginLoc], [row_index, beginLoc + word.length])
                )
            }
        })

        // normal matrix reversed
        splitted_soup.map((row) => {
            // console.log(row)
            
            let temprow = [...row].reverse().join('');
            // temprow = row.join('')
            if(temprow.includes(word)) {
                console.log("Found word " + word + " in normal reversed matrix")
                console.log([row_index,beginLoc])
                console.log([row_index,beginLoc + word.length])
                results.push(
                    new Word(word, [row_index,beginLoc], [row_index, beginLoc + word.length])
                )
            }
        })

        // transposed matrix
        transposed_soup.map((row) => {
            // console.log(row)
            row.join('').includes(word) ? 
            (
                console.log("Found word " + word + " in transposed matrix") 
            ) : null;
        })

        // transposed matrix
        transposed_soup.map((row) => {
            // console.log(row)
            let temprow = [...row].reverse().join('');
            temprow.includes(word) ? 
            (
                console.log("Found word " + word + " in transposed reversed matrix") 
            ) : null;
        })
    });

    // console.log(wowo.indexOf('EFG'));
    // console.log(wowo)

}

main(example_soup);