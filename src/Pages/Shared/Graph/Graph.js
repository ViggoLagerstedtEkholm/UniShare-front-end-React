import {Bar} from 'react-chartjs-2';
import {CourseContext} from "../Context/CourseContext";
import {useContext, useEffect, useState} from "react";
import {GetGraphData} from "../../Service/CourseService";
import {Loading} from "../State/Loading";

export const Graph = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [data, setData] = useState(null);
    const {courseID} = useContext(CourseContext);
    const [isLoaded, setHasLoaded] = useState(false);

    useEffect(  () => {
        GetGraphData(courseID).then(response =>{
            console.log(response);
            let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < response.length; i++) {
                console.log("Rating:" + response[i]['rating']);
                console.log("Rating:" + response[i]['rating']);
                const item = response[i];
                count[item['rating'] - 1] = item['count'];
            }
            setData(count);
            setHasLoaded(true);
        })
    }, [courseID]);


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
            {isLoaded ?
                <Bar data={dataset} options={options}/>
             : <Loading/>}
        </div>
    )
}