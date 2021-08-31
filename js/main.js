const loadCovidData = async () => {
    const response = await fetch('https://api.covid19api.com/summary');
    const data = await response.json();
    updateHomePage(data);

}
loadCovidData();

const updateHomePage = data => {
    console.log(data)
    const todayAffected = document.getElementById('today-affected');
    todayAffected.innerText = data.Global.NewConfirmed;
    const todayDeaths = document.getElementById('today-death');
    todayDeaths.innerText = data.Global.NewDeaths;
    const totalDeaths = document.getElementById('total-death');
    totalDeaths.innerText = data.Global.TotalDeaths;
}
