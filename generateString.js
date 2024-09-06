const para = document.querySelector(".p")
const inputFeild = document.querySelector(".input-feild")
const mistakeTag = document.querySelector(".mistakes")
const timeTag = document.querySelector(".timing")
const wpmTag = document.querySelector(".wordpermin")
const cpmTag = document.querySelector(".codepermin")
const resetButton = document.querySelector("button")
const accuracyTag = document.querySelector(".percent")
let generatedString = " "
let charIndex = 0;
let Mistakes = 0
let timer
let maxTime = 60
let timeLeft = maxTime
let isTyping = 0
// let wordspermin = 0
// let characterspermin = 0


//generating random paragraph
// function generate () {
    let wordArray = ["the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","i","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"]
    
    for(let i=0;i<wordArray.length;i++)
    {
        generatedString += wordArray[Math.floor(Math.random()* wordArray.length)] 
        generatedString += " "
    }
    generatedString += "."
    para.innerHTML = generatedString
// }
// generate()
let x = generatedString
let total = ""
// console.log(x);
//breaking each word of array into seperate span to iterate whether each word typed is correct or not
for(let i=1;i<x.length;i++)
{
    let temp = `<span>${x[i]}</span>`
    total += temp
}
para.innerHTML = total 

//focusing input feild on keydown and click
document.addEventListener("keydown",()=>{
    inputFeild.focus()
})
para.addEventListener("click",()=>{
    inputFeild.focus()
})


inputFeild.addEventListener("input",initTyping)
function initTyping()
{
    const characters = para.querySelectorAll("span");
    let typedChar = inputFeild.value.split("")[charIndex];
    if(charIndex < characters.length -1 && timeLeft > 0)
    {
        if(!isTyping)          //once the timer has started it will not start again on any key pressing
    {
        timer = setInterval(initTimer,1000)
        isTyping = true
    }         
    //if user hasn't entered any character or pressed backspace
    if(typedChar == null)
    {
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect"))
        {
            Mistakes--;
        }
        characters[charIndex].classList.remove("correct","incorrect")
    }
    else
    {
        //if user typed character and the shown character gets matched then add correct class else increment the mistakes add incorrect class. 
    if(characters[charIndex].innerText === typedChar)
    {
        characters[charIndex].classList.add("correct")
    }
    else
    {
        Mistakes++
        characters[charIndex].classList.add("incorrect")
    }
    charIndex++ //increment the index whther user typed correct or incorrect
    }
    
    let wordspermin = Math.round((((charIndex - Mistakes) / 5) / (maxTime - timeLeft)) * 60)
    if(wordspermin < 0 || !wordspermin || wordspermin === Infinity)
    {
        wordspermin = 0
    }
    mistakeTag.innerText = Mistakes
    wpmTag.innerText = wordspermin
    cpmTag.innerText = charIndex - Mistakes    //cpm will not calculate mistakes
    accuracyTag.innerText = `${(((charIndex - Mistakes) / (charIndex)) * 100).toFixed(2)}%`
    //Lets show blinking pointer to active character
    // characters[charIndex].classList.add("active")
    }
    else
    {
        inputFeild.value = ""
        clearInterval(timer)
    }
    
}
function initTimer()
{
    //if timer is greater than 0 then decrement it else clear the timer
    if(timeLeft > 0)
    {
        timeLeft--
        timeTag.innerText = `${timeLeft}s`;
    }
    else
    {
        clearInterval(timer)
    }
}

function resetGame()
{
    generatedString =""
    charIndex = 0 
    Mistakes = 0
    timer
    maxTime = 30
    timeLeft = maxTime
    isTyping = 0
    mistakeTag.innerText = Mistakes
    wpmTag.innerText = 0
    cpmTag.innerText = 0 
    for(let i=0;i<wordArray.length;i++)
    {
        generatedString += wordArray[Math.floor(Math.random()* wordArray.length)] 
        generatedString += " "
    }
    generatedString += "."
    para.innerHTML = generatedString 
    inputFeild.addEventListener("input",initTyping)


}
resetButton.addEventListener("click",resetGame);
