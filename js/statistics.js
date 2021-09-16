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
    const convertLowerCase = search.value.toLowerCase();
    const searchResultByCountry = document.getElementById('search-result-by-country');
    const modalTitle = document.getElementById('country-name-with-flag');
    // console.log(convertLowerCase);
    fetch('https://api.covid19api.com/summary')
        .then(res => res.json())
        .then(data => data.Countries.forEach(element => {
            if (element.Slug === convertLowerCase) {
                console.log(element)
                fetch(`https://restcountries.eu/rest/v2/name/${convertLowerCase}`)
                    .then(res => res.json())
                    .then(data => modalTitle.innerHTML = `${element.Country} <img src="${data[0].flag}" style="height: 20px; width: 40px;">`);


                searchResultByCountry.innerHTML = `
                    <tr>
                        <th>Today Confirm</th>
                        <td>${element.NewConfirmed}</td>
                    </tr>
                    <tr>
                        <th>Today Death</th>
                        <td>${element.NewDeaths}</td>
                    </tr>
                    <tr>
                        <th>Total Confirm</th>
                        <td>${element.TotalConfirmed}</td>
                    </tr>
                    <tr>
                        <th>Total Death</th>
                        <td>${element.TotalDeaths}</td>
                    </tr>
                `
                search.value = ''
            }

            // console.log(elemenst);
        }))

}