const btn = document.getElementById('btn');
const title = document.getElementById('title');
const p = document.getElementById('p');
const category = document.getElementById('category');
const answers = document.getElementById('answers');
let corAnsC = 0;

btn.addEventListener('click', ()=>{
    title.innerText = '取得中';
    p.innerText = '少々お待ち下さい';
    btn.style.display = 'none';

    fetch('https://opentdb.com/api.php?amount=10')
        .then((response) => {
            if(response.ok) {
            return response.json();        
            } else {
            throw new Error();
            }
        })
        .then((json) => {
            let c=0;
            console.log(json);
            questionRes(json, c);            

        })
        .catch((error) => console.log(error));
    
});

const questionRes = (json, c)=>{   
    title.innerText = '問題'+parseInt(c+1);
    while (category.firstChild) {
        category.removeChild(category.firstChild);
      }
    const newGenre = document.createElement('p');
    const newDiff = document.createElement('p');
    //console.log(newGenre);
    
    newGenre.innerText = '[ジャンル] ' + json['results'][c]['category'];
    newDiff.innerText = '[難易度] ' + json['results'][c]['difficulty'];
    category.appendChild(newGenre);
    category.appendChild(newDiff);
    p.innerText = json['results'][c]['question'];

    //答え選択肢を一旦全て消去
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
    let candidateAns = json['results'][c]['incorrect_answers'];
    let correctAns = json['results'][c]['correct_answer'];
    console.log(correctAns)
    //答え候補に正解をpush(念の為)
    candidateAns.push(correctAns);
    console.log('candidateAns:'+candidateAns);
    //candidateAnsをシャッフル
    const shuffleCanAns = shuffle(candidateAns);
    console.log('shuffleCanAns:'+shuffleCanAns)
    for (let i=0;i<=shuffleCanAns.length-1;i++){
        const button = document.createElement('button');
        button.innerText = shuffleCanAns[i];
        button.id = 'answers-' + i;
        button.className = 'answers';
        button.style.display = 'block';
        answers.appendChild(button);
        answers.style.display = 'block';
    } 
    const btnTo = document.getElementsByClassName('answers');
    const btnToResult = Array.from(btnTo);
    console.log('btnToResult:'+btnToResult)
    
    for (let i=0;i<=shuffleCanAns.length-1;i++){
        console.log('corAnsC:'+corAnsC);
        btnToResult.forEach((b)=>{
            //console.log('b:'+b.innerText)
            b.onclick = ()=>{
                if (c === 9){
                    answers.style.display = 'none';
                    newDiff.innerText = '';
                    newGenre.innerText = `あなたの正解数は${corAnsC}です`;
                    p.innerText = '再度チャレンジしたい場合は下をクリック';                            
                    btn.style.display = 'block';
                } else {
                    if (b.innerText===correctAns){
                        corAnsC++;
                    }
                    console.log('corAnsC:'+corAnsC);
                    c++;
                    //questionResの再帰
                    questionRes(json, c);  
                }
            }
        });
    }
    

}

//答え候補をシャッフル
const shuffle = ([...array]) => {
    for (let c=0;c<5;c++){
        for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
    }
    return array;
  }

// const getCorAnsC = (i, correctAns)=>{
//     if (answers.childNodes[i].innerText === correctAns){               
//         const correctAnswer = document.getElementById(answers.childNodes[i].id);
//         console.log('correctAnswer:'+correctAnswer.innerText);                        
//         correctAnswer.addEventListener('click', (e)=>{
//             console.log(e);
//             corAnsC++;                   
//         });
//     }  
//     return 
// }