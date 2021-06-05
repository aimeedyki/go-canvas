import * as go from 'gojs';

const initDiagram = () => {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, {
    initialDocumentSpot: go.Spot.Center,
    initialViewportSpot: go.Spot.Center,
    'undoManager.isEnabled': true,
    model: $(go.GraphLinksModel, {
      linkKeyProperty: 'key',
    }),
  });

  diagram.nodeTemplate = $(
    go.Node,
    'Auto',
    {
      resizable: true,
      locationSpot: go.Spot.Center,
    }, 
    $(
      go.Shape,
      'Rectangle',
      { strokeWidth: 0.1, fill: 'black' },
      new go.Binding('fill', 'color')
    ),
    $(
      go.TextBlock,
      { margin: 8, name: 'TEXT', minSize: new go.Size(30, 15), background: 'white' },
      new go.Binding('text', 'key', (k: string) => {
        return `node ${k}`;
      })
    ),
  );

  diagram.linkTemplate = $(
    go.Link,
    new go.Binding('relinkableFrom', 'canRelink').ofModel(),
    new go.Binding('relinkableTo', 'canRelink').ofModel(),
    {
      routing: go.Link.AvoidsNodes,
      relinkableFrom: true,
      relinkableTo: true,
      adjusting: go.Link.Stretch,
    },
    $(go.Shape),
    $(go.Shape, { toArrow: 'Standard' }),
    $(
      go.TextBlock,
      { name: 'TEXT', minSize: new go.Size(30, 15) },
      new go.Binding('text', 'text')
    ),
  );

  return diagram;
};

export default initDiagram;
