import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import loading from '../Images/loading.gif'
import SuiteSelectorPane from './SuiteSelector/index';
import './App.css';
import database from '../database';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suite_loaded: null,
      suites: null,
      buildSelection: null
    };
    this.onSelect = this.onSelect.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    if (!this.state.suites || JSON.stringify(this.state.suites) === "{}") {
      database.ref('/suites/').once('value', (snapshot) => {
        this.setState ({suites: snapshot.val()});
      })
    }
    else {
      database.ref('/').on('child_changed', (snapshot) => {
        this.setState({suites: snapshot.val()});
      })
    }
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/') {
      this.setState({
        suite_loaded: true,
        suites: {}
      }, () => {
          this.loadData()
        }
      )
    } else {
      this.loadData()
    }
  }

  onSelect(buildSelection) {
    if (this.state.buildSelection) {
      database.ref(`suites/${this.state.buildSelection.selectedSuite}/${this.state.buildSelection.selectedBuild}/`).off()
    }

    this.setState ({
      buildSelection: buildSelection,
      suite_loaded: true
    }, () => {
      const filter = this.props.location.query.filter || 'status';
      const path = `/suite/${this.state.buildSelection.selectedSuite}/build/${this.state.buildSelection.selectedBuild}?filter=${filter}`;
      hashHistory.push(path);
    });
  }

  render() {
    if(!this.state.suites){
      return(
        <div className="no-suites-found">
          <img src={loading} alt=""/>
          <h1>Looking for saved executions</h1>
        </div>
      );
    } else {
      if (!this.state.suite_loaded) {
        return(
            <div className='App' onMouseOver={this.loadData}>
              <div className="no-suite-loaded">
                <h1>Select suite and build</h1>
                <SuiteSelectorPane suites={this.state.suites} onSelect={this.onSelect}/>
              </div>
            </div>
        );
      } else {
        return (
            <div className='App' onMouseOver={this.loadData}>
              <SuiteSelectorPane suites={this.state.suites} onSelect={this.onSelect}/>
              {this.props.children}
            </div>
        );
      }
    }
  }
}

export default App;
