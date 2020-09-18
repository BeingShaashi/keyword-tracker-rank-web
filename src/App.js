import React, { Component } from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
import api from "./api";

class App extends Component {
  state = {
    datasets: [],
    labels: [],
    keyword: "headphone",
    productId: "B00NJ2M33I",
  };

  componentDidMount() {
    this.load();
  }

  render() {
    console.log(this.state);

    return (
      <div className="app">
      <div className="chartbox">
        <div className="inputBox">
          <label>
            Keyword{" "}
            <input
              value={this.state.keyword}
              onChange={(e) => this.setState({ keyword: e.target.value })}
            />
          </label>
          <label>
            ProductID{" "}
            <input
              value={this.state.productId}
              onChange={(e) => this.setState({ productId: e.target.value })}
            />
          </label>
          <button onClick={this.load.bind(this)}>Load</button>
        </div>

        <div className="chartcontainer">
          <Line
            data={{
              datasets: this.state.datasets,
              labels: this.state.labels,
            }}
            options={{
              // title: {
              //   display: true,
              //   text: "",
              //   fontSize: 20,
              // },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>

      </div>
      </div>
    );
  }

  async load() {
    try {
      const query = {
        keyword: this.state.keyword,
        productId: this.state.productId,
      };

      console.info({ query });

      let { ranks } = await api.get("v1/rank", query);
      console.info({ ranks });

      let labels = ranks?.map((x) => moment(x.ts).format("DD MMM YY, hh:mm a"));
      let absoluteRanks = ranks.map((x) => x.absoluteRank);
      let pageCount = ranks.map((x) => x.pageCount);

      this.setState({
        datasets: [
          {
            label: "Rank",
            fill: false,
            lineTension: 0.1,
            borderColor: "rgba(75,192,192,1)",
            pointRadius: 1,
            pointHitRadius: 10,
            data: absoluteRanks,
          },
          {
            label: "Page",
            fill: false,
            lineTension: 0.1,
            borderColor: "rgba(75,75,192,1)",
            pointRadius: 1,
            pointHitRadius: 10,
            data: pageCount,
          },
        ],
        labels,
      });
    } catch (e) {
      console.warn(e);
    }
  }
}

export default App;
