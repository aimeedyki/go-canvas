import { ReactElement, useEffect, useRef, useState } from 'react';
import * as go from 'gojs';

import { loadDiagram } from '../../utils';
import initDiagram from '../../utils/initDiagram';
import { Quadtree } from '../../utils/Quadtree';
import Loader from '../Loader/Loader';

import './Diagram.scss';

const $ = go.GraphObject.make;
const wholeModel = $(go.GraphLinksModel);
const wholeQuadtree = new Quadtree();

const Diagram = (): ReactElement => {
  const diagramRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (diagramRef.current) {
      const diagram = initDiagram();
      diagram.div = diagramRef.current;
      diagram.model = $(go.GraphLinksModel);
      diagram.isVirtualized = true;
      diagram.addDiagramListener('ViewportBoundsChanged', onViewportChanged);
      diagram.addModelChangedListener(onModelChanged);
      diagram.commandHandler.selectAll = () => {};

      diagram.delayInitialization(() => {
        try {
          loadDiagram(wholeQuadtree, wholeModel, diagram);
        } finally {
          setIsLoading(false);
        }
      });

      return () => diagram.removeModelChangedListener(onModelChanged);
    }
  }, []);

  function addNode(diagram: go.Diagram, data: go.ObjectData) {
    const { model } = diagram;

    if (model.containsNodeData(data)) return;

    model.addNodeData(data);
    const node = diagram.findNodeForData(data);

    if (node !== null) node.ensureBounds();
  }

  function onViewportChanged(event: go.DiagramEvent) {
    const { diagram } = event;
    const viewb = diagram.viewportBounds;
    const { model } = diagram;
    diagram.skipsUndoManager = true;
    const newBounds = new go.Rect();
    const nodeData = wholeQuadtree.intersecting(viewb) as any;

    for (let i = 0; i < nodeData.length; i++) {
      const node = nodeData[i];

      if (model.containsNodeData(node)) continue;

      if (!node.bounds) continue;

      if (node.bounds.intersectsRect(viewb)) {
        addNode(diagram, node);
      }
    }

    if (model instanceof go.GraphLinksModel) {
      const ldata = wholeModel.linkDataArray;
      for (let i = 0; i < ldata.length; i++) {
        const l = ldata[i];
        if (model.containsLinkData(l)) continue;
        
        const fromkey = wholeModel.getFromKeyForLinkData(l);
        if (fromkey === undefined) continue;

        const from = wholeModel.findNodeDataForKey(fromkey);
        if (from === null || !from.bounds) continue;

        const tokey = wholeModel.getToKeyForLinkData(l);
        if (tokey === undefined) continue;

        const to = wholeModel.findNodeDataForKey(tokey);
        if (to === null || !to.bounds) continue;

        newBounds.set(from.bounds);
        newBounds.unionRect(to.bounds);

        if (newBounds.intersectsRect(viewb)) {
          addNode(diagram, from);
          addNode(diagram, to);
          model.addLinkData(l);
          const link = diagram.findLinkForData(l);

          if (link !== null) {
            link.updateRoute();
          }
        }
      }
    }
  }

  function onModelChanged(event: go.ChangedEvent) {
    if (event.model.skipsUndoManager) return;
    if (event.change === go.ChangedEvent.Property) {
      if (event.propertyName === 'bounds') {
        wholeQuadtree.move(event.object, event.newValue.bounds.x, event.newValue.bounds.y);
      }
    } else if (event.change === go.ChangedEvent.Insert) {
      if (event.propertyName === 'nodeDataArray') {
        wholeModel.addNodeData(event.newValue);
        wholeQuadtree.add(event.newValue, event.newValue.bounds);
      } else if (event.propertyName === 'linkDataArray') {
        wholeModel.addLinkData(event.newValue);
      }
    } else if (event.change === go.ChangedEvent.Remove) {
      if (event.propertyName === 'nodeDataArray') {
        wholeModel.removeNodeData(event.oldValue);
        wholeQuadtree.remove(event.oldValue);
      } else if (event.propertyName === 'linkDataArray') {
        wholeModel.removeLinkData(event.oldValue);
      }
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="diagram" ref={diagramRef} />
    </>
  );
};

export default Diagram;
