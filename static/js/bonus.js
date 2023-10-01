// Function for gauge chart
function GaugeChart(sample) {
    d3.json(URL).then((data) => {
        let metadata = data.metadata;
        let value = metadata.filter(item => item.id == sample);
        let valueData = value[0];
        let washFreq = Object.values(valueData)[6]
        let trace2 = {
            value: washFreq,
            domain: {x: [0,1], 
                    y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "purple", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {
                    range: [0,10],
                    tickwidth: 1,
                    tickcolor: "black"},
                bar: {color: "white"},
                steps: [
                    {range: [0,2], color: "tan"},
                    {range: [2,4], color: "#996515"},
                    {range: [4,6], color: "sienna"},
                    {range: [6,8], color: "800080"},
                    {range: [8,10], color: "navy"},
                ]
            }
        };
        let layout = {
            plot_bgcolor: "lightgray",
            width: 500,
            height: 400,
            margin: {t:0, b:0},
        };
        Plotly.newPlot("gauge", [trace2], layout)
    });
};
