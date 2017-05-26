import {AfterContentInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import '../../../assets/lib/treant/Treant.js';
import {isUndefined} from "util";
declare const Treant: any;
@Component({
  selector: 'tree-diagram',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './tree-diagram.component.html',
  styleUrls: ['./tree-diagram.component.scss']
})
export class TreeDiagramComponent implements AfterContentInit, OnChanges {
  @Input() data: Object;
  @Input() diagramId: String;
  @Input() orientation: String;


  constructor() { }

  ngAfterContentInit() {
    /*
    let chartConfig:Object=
      {
        container: '#'+this.diagramId,
        nodeAlign: 'BOTTOM',
        rootOrientation: (this.orientation === undefined)? 'NORTH' :this.orientation ,
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

    let mapConfig: Object=
      {
        chart: chartConfig,
        nodeStructure: this.data
      };
    setTimeout(()=>{
      new Treant(mapConfig);
    },100)
    //
*/
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data'].currentValue !== changes['data'].previousValue){
      let currentData = changes['data'].currentValue;
      let chartConfig:Object=
        {
          container: '#'+this.diagramId,
          nodeAlign: 'BOTTOM',
          rootOrientation: (this.orientation === undefined)? 'NORTH' :this.orientation ,
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

      let mapConfig: Object=
        {
          chart: chartConfig,
          nodeStructure: currentData
        };
      setTimeout(()=>{
        new Treant(mapConfig);
      },200)
    }

  }

}
