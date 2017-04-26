import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import '../../../assets/lib/treant/Treant.js';
declare const Treant: any;
@Component({
  selector: 'tree-diagram',
  templateUrl: './tree-diagram.component.html',
  styleUrls: ['./tree-diagram.component.sass']
})
export class TreeDiagramComponent implements AfterContentInit {
  @Input() data:Object;
  private chartConfig:Object=
    {
      container: '#custom-colored',
      nodeAlign: 'BOTTOM',
      connectors: {
        type: 'step'
      },
      node: {
        HTMLclass: 'nodeExample1',
        collapsable: true
      },
      animateOnInit: true,
      animation: {
        nodeAnimation: 'easeOutBounce',
        nodeSpeed: 700,
        connectorsAnimation: 'bounce',
        connectorsSpeed: 700
      }

    };

  constructor() { }

  ngAfterContentInit() {
    let mapConfig: Object=
      {
        chart: this.chartConfig,
        nodeStructure: this.data
      };
    new Treant(mapConfig);

  }

}
