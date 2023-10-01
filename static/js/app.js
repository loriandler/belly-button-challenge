// Define the JSON file URL
const URL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(URL).then(function(data){
    console.log(data);
});

// Initialize data dashboard
function init() {

    //Use d3 select for dropdown
    let dropdown = d3.select("#selDataset");

    //Get sample names and populate dropdown
    d3.json(URL).then((data) => {

        //Set up variable for names
        let names = data.names;

        //Add names to dropdown
        names.forEach((id) => {

            console.log(id);

            dropdown.append("option")
            .text(id)
            .property("value", id);

        });

        //set up first value in list
        let sample_one = names[0];
        console.log(sample_one);

        //Initial Plots
        Metadata(sample_one);
        BarChart(sample_one);
        BubbleChart(sample_one);
        GaugeChart(sample_one);
    
    }).catch(error => {
        console.error("Error fetching data: ", error);
    })
};

// Function for populating dropdown info
function Metadata(sample) {

    //Get data for dropdown
    d3.json(URL).then((data) => {
        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        // first index from array
        let valueData = value[0];

        // clear out data
        d3.select("#sample-metadata").html("");

        // Add Key/value pair
        Object.entries(valueData).forEach(([key,value]) => {
            console.log(key, value);

        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

     });
};

// Function for bar chart
function BarChart(sample) {

    // Get data for bar chart
    d3.json(URL).then((data) => {
        let sampleInfo = data.samples;

        // Filter results based on value
        let value = sampleInfo.filter(result => result.id == sample);

        // First index from array
        let valueData = value[0];

        // Set variables
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        // Slice data for top ten items
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0, 10).reverse();
        let labels = otu_labels.slice(0, 10).reverse();

        //Set up trace for bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h",
            marker: {
                color: xticks,
                colorscale: "Electric"
            }
        };
        
        // Set layout
        let layout = {
            title: "Top 10 OTUs Present",
            plot_bgcolor: "lightgray"
        };

        // Plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
        
    });

};


// Function for bubble chart
function BubbleChart(sample) {

    // Get data for bubble chart
    d3.json(URL).then((data) => {
        let sampleInfo = data.samples;

        // Filter results based on value
        let value = sampleInfo.filter(result => result.id == sample);

        // First index from array
        let valueData = value[0];

        // Set variables
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        // Set up trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Electric"
            }
        };

        // Set up layout for bubble chart
        let layout = {
            title: "Bacteria Per Sample",
            plot_bgcolor: "lightgray",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};


// Function for updating when value is changed
function optionChanged(value) {

    // Log new value
    console.log(value);

    // Call functions
    Metadata(value);
    BarChart(value);
    BubbleChart(value);
    GaugeChart(value);
};

// Call the intialize function
init();