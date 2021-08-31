const loadCovidData = async () => {
    const response = await fetch('https://api.covid19api.com/summary');
    const data = await response.json();
    updateStatistics(data);

}
loadCovidData();

const updateStatistics = data => {
    // console.log(data.Countries)
    const tbody = document.getElementById('tbody');
    let count = 0;
    data.Countries.forEach(element => {
        count += 1;
        // console.log(element);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${count}</td>
            <td>${element.Country}</td>
            <td>${element.NewConfirmed}</td>
            <td>${element.NewDeaths}</td>
            <td>${element.TotalConfirmed}</td>
            <td>${element.TotalDeaths}</td>
        `
        tbody.appendChild(tr);
    });
}

const country = () => {
    const search = document.getElementById('serach-by-country');
    fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => data.forEach(element => {
            console.log(data.Countries.Slug)
        }))
}