Trie = function(){
  this.characters = {};
  this.isWord = false;
};

Trie.prototype.learn = function(word, index){
  
  index = index || 0;

  var letter = word[index];
  if (index !== word.length) {
    if (this.characters[letter] === undefined){
      this.characters[letter] = new Trie();
    }
    var childT = this.characters[letter];
    childT.learn(word, index + 1);
  } else if (index === word.length) {
    this.isWord = true;
  }    
};

Trie.prototype.find = function(word, index){

  word = word || "";
  index = index || 0;
  var letter = word[index];
  var node = this.characters;

    if (node[letter]){
      return node[letter].find(word, index + 1);
    }
    else if (index === word.length) {
      return this;
    }
    else {
      return false;
    }
};

Trie.prototype.getWords = function(words, currentWord){
  words = words || [];
  currentWord = currentWord || "";

  if (this.isWord){
    words.push(currentWord);
  }
  for (var c in this.characters){
    var newWord = currentWord + c;
    if (this.characters[c].characters){
      this.characters[c].getWords(words, newWord)
    }
  }
  return words;
  // go down each branch, collect the word flags
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
    var result = this.find(prefix);
    if(!result){
      return [];
    } 
    var res = result.getWords([],prefix);
    console.log(res);
    return result.getWords([],prefix);


};