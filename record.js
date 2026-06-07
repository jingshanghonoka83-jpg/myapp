function addform(){
    const targetElement = document.getElementById("addbutton");
    const htmlstring = 
    `<div class="record_set">
        <p  class="item_text">話の事実:</p>
        <input type="text" class="fact-input"><br>
        <p class="item_text">話の解釈:</p>
        <input type="text" class="interpretation-input"><br>
        <button type="button" class="button" onclick="deleteform(this)">フォーム取り消し</button>
    </div> `;

    targetElement.insertAdjacentHTML('beforebegin', htmlstring);
};

function deleteform(button){
    const targetBox = button.closest('.record_set');
    targetBox.remove();
};

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", ()=>{
    const storyText = document.getElementById("story").value.trim();
    const healthNum = document.getElementById("healthRange").value;
    const moodNum = document.getElementById("moodRange").value;
    const tomorrowText = document.getElementById("tomorrowTask").value.trim();
    const factAndInterpList = [];
    const allRecordSets = document.querySelectorAll('.record_set');

    console.log("今日の話:", storyText);
    console.log("体調:", healthNum);
    console.log("気分:", moodNum);
    console.log("明日やること:", tomorrowText);
    
    allRecordSets.forEach((setBox) => {
        const factText = setBox.querySelector('.fact-input').value.trim();
        const interpText = setBox.querySelector('.interpretation-input').value.trim();
        if (factText !== "" || interpText !== "") {
            factAndInterpList.push({
                fact: factText,
                interpretation: interpText
            });
        }});
        console.log("事実と解釈のリスト:", factAndInterpList);

        if (storyText === "" && factAndInterpList.length === 0 && tomorrowText === "") {
            alert("何も入力されていません。日記を書いてから記録してください！");
            return; 
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString();

        const newRecord = {
                id: Date.now(), 
                date: dateStr,
                story: storyText,
                health: healthNum,
                mood: moodNum,
                tomorrow: tomorrowText,
                factAndInterp: factAndInterpList 
            };

        let diaryData = JSON.parse(localStorage.getItem('myDiaryData')) || [];
        diaryData.push(newRecord);
        localStorage.setItem('myDiaryData', JSON.stringify(diaryData));
        alert("今日の記録を保存しました！");
        
        location.href = 'index.html';
});


