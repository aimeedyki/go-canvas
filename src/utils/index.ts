import * as go from 'gojs';
import { Quadtree } from './extensions/Quadtree';

export interface Node {
  key: number;
  color: string;
  bounds: go.Rect;
  label: string;
}

const getColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgb(${red},${green},${blue})`;

  return color;
}

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
  const nodes: Node[]  = [];
  const links = [];
  let previousIndex = 0;
  let linkLabelNo = 0;

  wholeQuadtree.clear();

  for (let i = 1; i <= noOfNodes; i += 1) {
    const node = {
      key: i,
      color: getColor(),
      bounds: new go.Rect((i % sqrt) * 100, Math.floor(i / sqrt) * 100, 50, 50),
      label: `node ${i}`
    };
    nodes.push(node);
    wholeQuadtree.add(node, node.bounds);

    if ((i !== 1 && i - 1 === previousIndex) || i === noOfNodes) continue;

    previousIndex = i;
    linkLabelNo += 1;
    links.push({ key: i * -1, from: i, to: i + 1, text: `link ${linkLabelNo}` });
  }

  wholeModel.nodeDataArray = nodes;
  wholeModel.linkDataArray = links;
  diagram.fixedBounds = computeDocumentBounds(wholeModel);

  return nodes;
};

export const paginateList = (array: any[], size: number) => {
  let result = [];

  for (let i = 0; i < array?.length; i += size) {
      let chunk = array.slice(i, i + size)
      result.push(chunk)
  }

  return result;
}