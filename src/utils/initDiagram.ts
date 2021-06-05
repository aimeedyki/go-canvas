import * as go from 'gojs';

import { LinkShiftingTool } from './LinkShiftingTool';

const scaleFont = (obj: any, scale: number) => {
  const adorn = obj.part;
  adorn.diagram.startTransaction('Change Text Size');
  const node = adorn.adornedPart;
  const tb = node.findObject('TEXT');
  tb.scale *= scale;
  adorn.diagram.commitTransaction('Change Text Size');
};

const increaseFont = (e: go.InputEvent, obj: go.GraphObject) => {
  scaleFont(obj, 2);
};

const decreaseFont = (e: go.InputEvent, obj: go.GraphObject) => {
  scaleFont(obj, 0.5);
};

const initDiagram = (): go.Diagram => {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, {
    initialDocumentSpot: go.Spot.Center,
    initialViewportSpot: go.Spot.Center,
    layout: $(go.Layout, { isInitial: false, isOngoing: false }),
    'undoManager.isEnabled': true,
    model: $(go.GraphLinksModel, {
      linkKeyProperty: 'key',
    }),
  });

  diagram.nodeTemplate = $(
    go.Node,
    'Auto',
    {
      isLayoutPositioned: false,
      resizable: true,
      locationSpot: go.Spot.Center,
      fromSpot: go.Spot.AllSides,
      toSpot: go.Spot.AllSides,
      fromLinkable: true, toLinkable: true,
    },
    new go.Binding('position', 'bounds', (b) => b.position).makeTwoWay(
      (p, d) => new go.Rect(p.x, p.y, d.bounds.width, d.bounds.height)
    ),
    { width: 50, height: 50 },
    $(go.Shape, 'Rectangle', { strokeWidth: 0.1, fill: 'black' }, new go.Binding('fill', 'color')),
    $(
      go.TextBlock,
      { margin: 8, name: 'TEXT', minSize: new go.Size(30, 15), background: 'white' },
      new go.Binding('text', 'key', (k: string) => {
        return `node ${k}`;
      })
    ),
    {
      contextMenu: $(
        'ContextMenu',
        $(
          'ContextMenuButton',
          {
            'ButtonBorder.fill': 'white',
            _buttonFillOver: '#b2b7c2',
          },
          $(go.TextBlock, 'increase font'),
          { click: increaseFont }
        )
      ),
    }
  );

  diagram.toolManager.mouseDownTools.add($(LinkShiftingTool));
  diagram.toolManager.linkingTool.isEnabled = true;
  diagram.toolManager.relinkingTool.isEnabled = true;

  diagram.linkTemplate = $(
    go.Link,
    new go.Binding('relinkableFrom', 'canRelink').ofModel(),
    new go.Binding('relinkableTo', 'canRelink').ofModel(),
    {
      routing: go.Link.AvoidsNodes,
      relinkableFrom: true,
      relinkableTo: true,
      adjusting: go.Link.Stretch,
      isLayoutPositioned: false, 
      resegmentable: true,
    },
    $(go.Shape),
    $(go.Shape, { toArrow: 'Standard' }),
    $(
      go.TextBlock,
      {
        name: 'TEXT',
        minSize: new go.Size(30, 15),
        segmentIndex: 1, 
        segmentFraction: 1,
        segmentOrientation: go.Link.OrientPlus90
      },
      new go.Binding('text', 'text')
    ),
    {
      contextMenu: $(
        'ContextMenu',
        $(
          'ContextMenuButton',
          {
            'ButtonBorder.fill': 'white',
            _buttonFillOver: '#b2b7c2',
          },
          $(go.TextBlock, 'decrease font'),
          { click: decreaseFont }
        )
      ),
    }
  );

  return diagram;
};

export default initDiagram;
