/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        // TODO
        let chain = {}
        this.words.forEach((word,i) => {
            let chainWord = this.words[i+1] ? this.words[i+1] : null;
            if (word in chain){
                chain[word].push(chainWord)
            } else {
                chain[word] = [chainWord]
            }
        })
        this.chain = chain
    }


    /** return random text from chains */

    makeText(numWords = 100) {
        // TODO
        let keys = Array.from(Object.keys(this.chain));
        let word = keys[Math.floor(Math.random()*keys.length)]
        let output = [];

        while (output.length < numWords && word !==null){
            output.push(word);
            let words = this.chain[word]
            word = words[Math.floor(Math.random()*words.length)]
        }
        return output.join(" ");
    } 
}

module.exports = {
    MarkovMachine,
  };