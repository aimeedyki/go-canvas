import * as go from 'gojs';
import { Quadtree } from './Quadtree';

const computeDocumentBounds = (wholeModel: go.GraphLinksModel): go.Rect => {
  const documentBounds = new go.Rect();
  const nodeData = wholeModel.nodeDataArray;

  for (let i = 0; i < nodeData.length; i += 1) {
    const data = nodeData[i];

    if (!data.bounds) continue;

    if (documentBounds.isEmpty()) documentBounds.set(data.bounds);
    else documentBounds.unionRect(data.bounds);
  }

  return documentBounds;
};

export const loadDiagram = (
  wholeQuadtree: Quadtree<unknown>,
  wholeModel: go.GraphLinksModel,
  diagram: go.Diagram
) => {
  const noOfNodes = 10000;
  const sqrt = Math.floor(Math.sqrt(noOfNodes));
  const nodes = [];
  const links = [];
  let previousIndex = 0;

  wholeQuadtree.clear();

  for (let i = 1; i <= noOfNodes; i += 1) {
    const node = {
      key: i,
      color: go.Brush.randomColor(),
      bounds: new go.Rect((i % sqrt) * 100, Math.floor(i / sqrt) * 100, 50, 50),
    };
    nodes.push(node);
    wholeQuadtree.add(node, node.bounds);

    if ((i !== 1 && i - 1 === previousIndex) || i === noOfNodes) continue;

    previousIndex = i;
    links.push({ key: i * -1, from: i, to: i + 1, text: `${i} to ${i + 1}` });
  }

  wholeModel.nodeDataArray = nodes;
  wholeModel.linkDataArray = links;
  diagram.fixedBounds = computeDocumentBounds(wholeModel);
};
