import React from 'react';
import Container from 'components/container';
import moment from 'moment';
import numeral from 'numeral';
import _ from 'lodash';

import NVD3Chart from 'react-nvd3';
import d3 from 'd3';

//const LINECHART = 'lineWithFocusChart';
const LINECHART = 'lineChart';

const USDPNL = {
  name: 'USD PnL',
  values: [
  ]
};
const lineData = [
  USDPNL
];

export default class Analytics extends React.Component {

  static propTypes = {
    history: React.PropTypes.array,
    positions: React.PropTypes.array,
    status: React.PropTypes.bool
  }

  constructor(props, context){
    super(props, context);
    this.state = {
      tearoff: false,
      lastPos: 'unknown',
      positionType: 'BaseTradedAmount',
      series: [{
        series: 'PNL',
        label: 'PNL',
        area: true,
        values: []
      }]
    };

    this.chartOptions = {
      xAxis: {
        //axisLabel: 'Time',
        tickFormat: (d) => d3.time.format('%X')(new Date(d))
      },
      x2Axis: {
        tickFormat: (d) => d3.time.format('%X')(new Date(d))
      },
      yAxis: {
        axisLabel: 'PnL',
        tickFormat: d3.format(',.1'),
      },
      showYAxis: !true,
      showXAxis: true,
      showLegend: false,
      useInteractiveGuideline: true,
      margin: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 30
      }
    };
  }

  tearOff(state){
    this.setState({
      tearoff: state
    });
  }

  formatHistoricData(data = []){
    let lastPos,
      domainMin = 0,
      domainMax = 0;

    const formatted = _(data).filter(item => item && item.UsdPnl != null).map((item, i) => {
      lastPos = item.UsdPnl.toFixed(2);

      domainMin = Math.min(domainMin, item.UsdPnl);
      domainMax = Math.max(domainMax, item.UsdPnl);

      return {
        x: new Date(item.Timestamp),
        y: item.UsdPnl.toFixed(2)
      };
    }).value();

    this.setState({
      lastPos,
      domainMin,
      domainMax
    });

    return formatted;
  }

  componentWillReceiveProps(props){
    this.state.series[0].values = this.formatHistoricData(props.history);
  }

  render(){
    if (!this.props.status)
      return <span></span>;

    const PNLValues = this.state.series[0].values,
          { domainMin, domainMax } = this.state;

    const configure = (chart) => {
      chart.yDomain([domainMin, domainMax]).yRange([200, 0]);
    };

    const positionsSeries = [{
      key: 'Positions',
      values: this.props.positions
    }];

    return <Container title='analytics' className='analytics-container animated slideInRight' onTearoff={(state) => this.tearOff(state)}
                      tearoff={this.state.tearoff} width={400} height={800} options={{maximizable:true}}>

      <span>Profit & Loss <small className="text-small">USD {this.state.lastPos}</small></span>

      <div className="nv-container" ref="container">
        {(PNLValues && PNLValues.length) ?
          <NVD3Chart type={LINECHART} datum={this.state.series} options={this.chartOptions} height={220} configure={configure} /> :
          <div>No PNL data yet</div>}
      </div>

      <span>Positions / PNL</span>
      <button className="pull-right btn btn-small btn-default" onClick={() => this.setState({positionType: 'BaseTradedAmount'})}>Positions</button>
      <button className="pull-right btn btn-small btn-default" onClick={() => this.setState({positionType: 'BasePnl'})}>PnL</button>
      <div className="nv-container clearfix">
        <NVD3Chart id='position-chart' type='multiBarHorizontalChart' datum={positionsSeries} height={400} x="Symbol" y={this.state.positionType} />
      </div>
    </Container>;

  }
}
