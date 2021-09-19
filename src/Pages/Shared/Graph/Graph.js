import {Bar} from 'react-chartjs-2';

export const Graph = ({data, labels}) => {
    console.log(data, labels);

    const dataset = {
        labels: labels,
        datasets: [{
            label: 'Amount of ratings',
            data: data,
            hoverBorderColor: "#000",

            backgroundColor: [
                'rgb(22,45,62)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };

    const options = {
        responsive:true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: 'rgba(246,246,246,0)',
                    borderColor: 'red'
                },
                ticks: {
                    callback: function (value) {
                        return 'Rating: ' + (value + 1);
                    },
                    color: "white"
                },
            },

            y: {
                grid: {
                    borderColor: 'white'
                },
                ticks: {
                    color: "white"
                },
                title: {
                    display: true,
                    padding: {
                        top: 10,
                        bottom: 30
                    },
                    text: 'Amount of votes',
                    color: "white"
                }
            }
        }
    }

    return (
        <div className="graph-container">
            <Bar data={dataset} options={options}/>
        </div>
    )
}