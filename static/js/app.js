// Define the JSON file URL
const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(URL).then(responseData => {
    const names = responseData.names;
    const metadata = responseData.metadata;
    const samplesData = responseData.samples;

const dropdown = d3.select("#selDataset");

// Extract OTU data
const defaultIndividual = samplesData[0];

function BarChart(selectedIndividual) {

    //get top 10OTUs
    let top100Tus = selectedIndividual.sample_values.slice(0,10);
    let otuIDs = selectedIndividual.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
    let otuLabels = selectedIndividual.otu_labels.slice(0, 10);


    // Create the bar chart
    let barColor = "gold"
    let trace1 = {
        x: top100Tus,
        y: otuIDs,
        text: otuLabels,
        type: "bar",
        orientation: "h",
        marker: {
            color: barColor
        }
    };
    let layout = {
        title: "Top 10 OTUs",
        xaxis: {title: "Sample Values"},
        yaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bar-chart", [trace1], layout);
}

// Populate the dropdown
dropdown.append("option")
        .attr("value", "")
        .text("");

names.forEach((individual, index) => {
    dropdown.append("option")
        .attr("value", index)
        .text(`Test Subject ID ${index +1}`);
});

// Call function when dropdown selection changes
function optionChanged(selectedSampleID){
    let selectedMetadata = metadata.find(item => item.id === selectedSampleID);
    showMetadata(selectedMetadata);
};

// Initialize bar chart
BarChart(defaultIndividual);

// Event listener
dropdown.on("change", function() {
    let selectedIndex = this.value;
    let selectedIndividual = samplesData[selectedIndex];
    BarChart(selectedIndividual);
    showMetadata(metadata[selectedIndex]);
});


// Create a bubble chart
let otuIDs = responseData.otus_ids;
let sampleValues = responseData.sample_values;
let otuLabels = responseData.otu_labels;

let trace2 = {
    x: otuIDs,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: 'Earth'
    }
};

let layout2 = {
    title: "Bubble Chart for Samples",
    xaxis: { title: "OTU IDs"},
    yaxis: { title: "Sample Values"},
    margins: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
    },
    hovermode: "closest"
};

Plotly.newPlot('bubble-chart', [trace2], layout2);

function optionChanged(selectedSampleID) {
    let selectedIndividual = samplesData[selectedSampleID];
    let otuIDs = selectedIndividual.otu_ids;
    let sampleValues = selectedIndividual.sample_values;
    let otuLabels = selectedIndividual.otu_labels;
}

// Display sample metadata function
function showMetadata(selectedMetadata) {
    let metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html("");

    // Display each key-value pair
    Object.entries(selectedMetadata).forEach(([key, value]) => {
        metadataDiv.append("p").text(`${key}: ${value}`);
    });
}


}).catch(error => {
    // Handle error if the data fails to load
    console.error("Error fetching data: ", error);
});