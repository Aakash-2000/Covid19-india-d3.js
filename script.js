let india;
let w = 800;
let h = 600;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
let covid;
let states = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CH: "Chandigarh",
    CT: "Chhattisgarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    LD: "Lakshadweep",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PY: "Puducherry",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TG: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    UK: "Uttaranchal",
    WB: "West Bengal"
}


function draw() {
    function initialize() {
        proj.scale(6700);
        proj.translate([-1240, 750]);
    }
    let cases = {

    }
    let c;
    var p1 = document.getElementById('p1');
    var p2 = document.getElementById('p2');
    var p3 = document.getElementById('p3');
    var p4 = document.getElementById('p4');
    var p5 = document.getElementById('p5');
    var t = document.getElementById('title')

    let min = 1000000000000000;
    let max = 0;
    let total = 0;
    let active = 0;
    let death = 0;
    let vaccinated = 0;
    let recovered = 0;
    console.log(covid)
    for (const [key, value] of Object.entries(states)) {
        //console.log(covid[key])
        cases[key] = covid.hasOwnProperty(key) ? covid[key]['total']['confirmed'] - (covid[key]['total']['deceased'] + covid[key]['total']['recovered']) : "No details"
        active += covid.hasOwnProperty(key) ? covid[key]['total']['confirmed'] - (covid[key]['total']['deceased'] + covid[key]['total']['recovered']) : 0
        total += covid.hasOwnProperty(key) ? covid[key]['total']['confirmed'] : 0
        death += covid.hasOwnProperty(key) ? covid[key]['total']['deceased'] : 0
        recovered += covid.hasOwnProperty(key) ? covid[key]['total']['recovered'] : 0
        vaccinated += covid.hasOwnProperty(key) ? covid[key]['total']['vaccinated'] : 0

        if (cases[key] < min && cases[key] != 0) {
            min = cases[key]
        }
        if (max < cases[key]) {
            max = cases[key]
        }
    }
    // console.log(active,total,death,recovered,vaccinated)
    p1.innerHTML = 'Total cases  - ' + total
    p2.innerHTML = 'Active - ' + active
    p3.innerHTML = 'Death - ' + death
    p5.innerHTML = 'Vaccinated - ' + vaccinated
    p4.innerHTML = 'Recovered  - ' + recovered

    let xscale = d3.scaleLinear()
        .domain([min, max])
        .range([1, 10])
    // india.features.forEach((ele)=>{
    //     console.log(ele.properties)
    // })
    console.log(cases)
    var myColor = d3.scaleLinear().domain([1, 10])
        .range(["white", "red"])
    let svg = d3.select('#canvas')
    let tooltip = d3.select('#tooltip')
    svg.attr('width', w)
    svg.attr('height', h)
    svg.call(initialize);

    svg.selectAll('path')
        .data(india)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', (item) => {
            for (const [key, value] of Object.entries(states)) {
                if (item.properties.hasOwnProperty('name') && item.properties.alias === key) {

                    c = cases[key]
                    c = xscale(c)
                    return myColor(c)
                }

                if (item.properties.alias === "DH") {
                    c = cases['DN']
                    c = xscale(c)
                    return myColor(c)
                }
                if (item.properties.alias === "UK") {

                    return "#fffcfc"

                }
                if (item.properties.alias === "CG") {
                    c = cases["CT"]
                    c = xscale(c)
                    return myColor(c)
                }



            }
            return "#fffcfc"


        })
        .on('mouseover', (item) => {
            console.log(item.properties.alias)
            //tooltip.transition().style('visibility', 'visible')
            for (const [key, value] of Object.entries(states)) {
                if (item.properties.hasOwnProperty('name') && item.properties.alias === key) {
                   
                    
                    t.innerHTML = item.properties.name;
                    //tooltip.text(item.properties.name + ' Active - ' + cases[item.properties.alias])
                    p1.innerHTML = 'Total cases  - ' + covid[item.properties.alias]['total']['confirmed']
                    p2.innerHTML = 'Active - ' + cases[item.properties.alias]
                    p3.innerHTML = 'Death - ' + covid[item.properties.alias]['total']['deceased']
                    p5.innerHTML = 'Vaccinated - ' + covid[item.properties.alias]['total']['vaccinated']
                    p4.innerHTML = 'Recovered  - ' + covid[item.properties.alias]['total']['recovered']
                    return

                }
                if (item.properties.alias === "CG") {
                    // tooltip.text(item.properties.name + ' Active - ' + cases['CT'])
                    t.innerHTML = item.properties.name;
                     p1.innerHTML = 'Total cases  - ' + covid['CT']['total']['confirmed']
                     p2.innerHTML = 'Active - ' + cases['CT']
                     p3.innerHTML = 'Death - ' + covid['CT']['total']['deceased']
                     p5.innerHTML = 'Vaccinated - ' + covid['CT']['total']['vaccinated']
                     p4.innerHTML = 'Recovered  - ' + covid['CT']['total']['recovered']
                     return
                 }
                 if (item.properties.alias === "DH") {
                    //tooltip.text(item.properties.name + ' Active - ' + cases['DN'])
                    t.innerHTML = item.properties.name;
                    p1.innerHTML = 'Total cases  - ' + covid['DN']['total']['confirmed']
                    p2.innerHTML = 'Active - ' + cases['DN']
                    p3.innerHTML = 'Death - ' + covid['DN']['total']['deceased']
                    p5.innerHTML = 'Vaccinated - ' + covid['DN']['total']['vaccinated']
                    p4.innerHTML = 'Recovered  - ' + covid['DN']['total']['recovered']
                    return
                }
                if(item.properties.alias === "UK"){
                    t.innerHTML = item.properties.name;
                    p1.innerHTML = 'No details from API'
                    p2.innerHTML = ''
                    p3.innerHTML = ''
                    p5.innerHTML = ''
                    p4.innerHTML = ''
                    return
                }
                
            }
        })
        .on('mouseout', (item) => {
            t.innerHTML = 'India'
            p1.innerHTML = 'Total cases  - ' + total
            p2.innerHTML = 'Active - ' + active
            p3.innerHTML = 'Death - ' + death
            p5.innerHTML = 'Vaccinated - ' + vaccinated
            p4.innerHTML = 'Recovered  - ' + recovered
        })
        .attr('stroke', "#ffe6e6")


}
fetch("india.json").then(response => response.json()).then((data) => {
    //console.log(data)
    india = topojson.feature(data, data.objects.ne_10m_admin_1_India_Official).features

    fetch("https://api.covid19india.org/v4/min/data.min.json").then(res => res.json())
        .then((d) => {
            covid = d
            draw()
        })


})



