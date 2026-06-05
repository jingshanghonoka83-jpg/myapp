const urlParams = new URLSearchParams(window.location.search);
const targetId = urlParams.get('id');

const savedData = localStorage.getItem('myDiaryData');
const diaryList = JSON.parse(savedData) || [];

const targetRecord = diaryList.find((item) => item.id == targetId);

if (targetRecord) {

    document.getElementById('detail-date').textContent = targetRecord.date + " の記録";
    document.getElementById('detail-story').textContent = targetRecord.story;
    document.getElementById('detail-health').textContent = targetRecord.health;
    document.getElementById('detail-mood').textContent = targetRecord.mood;
    document.getElementById('detail-tomorrow').textContent = targetRecord.tomorrow;

    const setContainer = document.getElementById('detail-set-container');
    setContainer.innerHTML = ""; 

    targetRecord.factAndInterp.forEach((item) => {
       const htmlstring = `
            <div class="container" style="text-align: left; margin-bottom: 20px;">
                <p class="item_text" style="color: #ccc; margin-bottom: 5px;">話の事実:</p>
                <p style="margin-left: 15px; font-size: 18px; margin-top: 0;">${item.fact}</p>
                
                <p class="item_text" style="color: #ccc; margin-bottom: 5px;">話の解釈:</p>
                <p style="margin-left: 15px; font-size: 18px; margin-top: 0;">${item.interpretation}</p>
                
                <hr style="border: 0; border-top: 1px solid #555; margin-top: 20px;">
            </div>
        `;

        setContainer.insertAdjacentHTML('beforeend', htmlstring);
    });

} else {
    document.getElementById('detail-date').textContent = "データが見つかりませんでした";
}

const deleteBtn = document.getElementById('delete-record-btn');

if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        if (confirm("本当にこの日の記録を削除しますか？（元には戻せません）")) {
            

            let diaryList = JSON.parse(localStorage.getItem('myDiaryData')) || [];
            const updatedList = diaryList.filter((item) => item.id != targetId);

            localStorage.setItem('myDiaryData', JSON.stringify(updatedList));
            
            alert("記録を削除しました。");
            location.href = 'history.html';
        }
    });
}