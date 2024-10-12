/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

export default function correctSentence(text) {
  text = text.trim()
  if (typeof text !== "string" && text === null && text.length === 0){
    return false
  }

  if (text === ""){
    return ""
  }
  
  const res = text[0].toUpperCase() + text.split("").slice(1, text.length).join("") + ((text[text.length-1]) === "." ? "" : ".") ;
  return res
}

console.log(correctSentence(" "));