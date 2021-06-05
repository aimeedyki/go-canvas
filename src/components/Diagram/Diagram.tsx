import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import * as go from 'gojs';

import './Diagram.scss';

const Diagram = ({
  initDiagram,
  nodeDataArray,
  linkDataArray,
  modelData,
}: DiagramProps): ReactElement => {
  const diagramRef = useRef();

  useEffect(() => {
    if (diagramRef.current) {
      const diagram = initDiagram();
      diagram.div = diagramRef.current;

      diagram.delayInitialization(() => {
        const { model } = diagram;
        model.commit((m: go.Model) => {
          if (modelData !== undefined) {
            m.assignAllDataProperties(m.modelData, modelData);
          }

          m.mergeNodeDataArray(nodeDataArray);

          if (linkDataArray !== undefined && m instanceof go.GraphLinksModel) {
            m.mergeLinkDataArray(linkDataArray);
          }
        }, 'gojs-react init merge');
      });
    }
  }, []);

  return <div className="diagram" ref={diagramRef} />;
};

interface DiagramProps {
  initDiagram: () => go.Diagram;
  nodeDataArray: Array<go.ObjectData>;
  linkDataArray?: Array<go.ObjectData>;
  modelData?: go.ObjectData;
}

export default Diagram;
