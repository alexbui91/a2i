import { Component } from '@angular/core';

import { Globals } from './globals'
import { Chart } from 'angular-highcharts'
import { NgbModal, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'
import { LoginModal } from './components/login_modal'
import { Services } from './app.services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    title = 'happyresearch';
    conferences: Array<object> = []
    search_content: string = ""
    searchResults: Array<object> = []
    isShowSearchBox: boolean = false
    selectedDate: NgbDateStruct
    mchart: Chart
    cchart: Chart

    constructor(private globals: Globals, private rmodal: NgbModal, private services: Services, private calendar: NgbCalendar) {
        this.globals.page_class_style = ""
        this.globals.loadToken()
        let data = []
        let data1 = []
        // https://jsfiddle.net/y167rw4x/1/
        this.mchart = new Chart({
            tooltip: {
                enabled: false
            },
            chart: {
                type: 'line',
                //animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random()*4096;
                            series.addPoint([x, y], true, true);
                        }, 100);
                    }
                }
            },

            title: {
                text: 'Amount Consumption'
            },
            
            xAxis: {
                visible: false
            },
            yAxis: {
                title: {
                    text: 'MB'
                },
                min: 0,
                max: 4096
                
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false,
                },
                line: {
                    marker: {
                        enabled: false
                    }
                },
            },
            series: [
                {
                    type: 'line',
                    name: 'Memory',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;
            
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 100,
                                y: Math.random()
                            });
                        }
                        return data;
                    }()),
                    color: "#00a65a"
                }
            ]
        });
        this.cchart = new Chart({
            tooltip: {
                enabled: false
            },
            chart: {
                type: 'line',
                //animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random()*100;
                            series.addPoint([x, y], true, true);
                        }, 100);
                    }
                }
            },
            title: {
                text: 'Percentage Consumption'
            },
            xAxis: {
                visible: false
            },
            yAxis: {
                title: {
                    text: '%'
                },
                min: 0,
                max: 100
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false,
                },
                line: {
                    marker: {
                        enabled: false
                    }
                }
            },
            series: [
                {
                    type: 'line',
                    name: 'CPU',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;
            
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 100,
                                y: Math.random()*100
                            });
                        }
                        return data;
                    }()),
                    color: "#00c0ef"
                }
            ]
        });
    }
    logout() {
        localStorage.clear()
        window.location.reload()
    }
    goToTop() {
        window.scrollTo(0, 0)
    }
    openLoginModal() {
        let rref = this.rmodal.open(LoginModal)
    }

}
