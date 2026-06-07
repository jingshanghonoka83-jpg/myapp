const savedData = localStorage.getItem('myDiaryData');
const diaryList = JSON.parse(savedData) || [];

console.log("倉庫から戻ってきたリスト:", diaryList);


const historyContainer = document.getElementById('history-list');


diaryList.forEach((record) => {
    
    const htmlstring = `
        <div class="container" style="margin-bottom: 20px;">
        <a href="detail.html?id=${record.id}" style="text-decoration: none; color: #fff; font-size: 18px;">
            <h3>📅 ${record.date}</h3>
            </a>
            <hr>
        </div>
    `;
    historyContainer.insertAdjacentHTML('beforeend', htmlstring);
    
});