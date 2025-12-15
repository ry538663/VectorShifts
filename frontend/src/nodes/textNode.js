// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Extract variables and update handles
  useEffect(() => {
    const variableRegex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
    const matches = [...currText.matchAll(variableRegex)];
    const variables = Array.from(new Set(matches.map(m => m[1])));

    const newHandles = [
      ...variables.map(variable => ({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
      })),
      { type: 'source', position: Position.Right, id: `${id}-output` }
    ];

    setHandles(newHandles);
    // Force ReactFlow to update handle positions
    setTimeout(() => updateNodeInternals(id), 0);

  }, [currText, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode id={id} data={data} title="Text" handles={handles}>
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            minHeight: '80px',
            resize: 'none',
            overflow: 'hidden',
          }}
        />
      </label>
    </BaseNode>
  );
}
