const growing = document.querySelectorAll(".growing")
const input = document.querySelector("#input")
const submit = document.querySelector("#submit")
const score = document.querySelector(".score")
const refresh = document.querySelector(".refresh")

let initialScore = 6000
let scoreNum = 6000;
score.innerHTML = `Rezultat: ${scoreNum} / ${initialScore}`

refresh.addEventListener("click", () => {
    window.location.reload()
})

const places = [0,1,2,3,4,5]

const words = [
    "banana",
    "laptop",
    "parket",
    "cipela",
    "snijeg",
    "jagoda",
    "kupina",
    "gazela",
    "domaće",
    "sirovo"]

/* Array Shuffler Fisher Method */

function shuffle (arr) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}

let allowedClicks = [shuffle(places)[0], shuffle(places)[1], shuffle(places)[2]]

let chosenWord = shuffle(words)[0]
let typedWord = ""
let numOfGuesses = 0

for(let [i, box] of growing.entries()){
  
    if(allowedClicks.includes(i)){
        box.style.border = "2px solid green"
        box.addEventListener("click", () => {
            box.classList.add("scale")
            box.innerHTML = chosenWord[i]
            scoreNum -= 1000;
            if(scoreNum < 0){
                scoreNum = 0
            }
            score.innerHTML = `Rezultat: ${scoreNum} / ${initialScore}`;
            setTimeout(() => {
                box.classList.remove("scale")
            }, 1000)
        })
    }
}

input.onchange = function(e) {
    console.log(e.target.value)

    typedWord = e.target.value
}

submit.onclick = function(e) {
    numOfGuesses += 1;
    if(typedWord === chosenWord){
        for(let [i, box] of growing.entries()){
            box.innerHTML = chosenWord[i]
            }
        alert(`Pogodak! Tvoj rezultat: ${scoreNum}`)
      
    } else {
        alert("Pogrešno! -500 bodova i vidljivo jedno crveno polje")
        scoreNum -= 500;
        for(let [i, box] of growing.entries()){
  
            if(!allowedClicks.includes(i)){
                
                box.innerHTML = chosenWord[i]
                
                if(scoreNum < 0){
                    scoreNum = 0
                }
                score.innerHTML = `Rezultat: ${scoreNum} / ${initialScore}`;
            break
            }
        }
    }
}