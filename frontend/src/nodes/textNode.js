// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

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
      // Reset dimensions to calculate correct scroll values
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.width = 'auto';

      // Calculate new dimensions
      const newHeight = textareaRef.current.scrollHeight;
      const newWidth = textareaRef.current.scrollWidth;

      // Apply new dimensions
      textareaRef.current.style.height = `${newHeight}px`;

      // Ensure width doesn't shrink below a reasonable default (e.g., parent's min-width is often around 200px)
      // and allows growth.
      // We adding a little buffer to avoid immediate wrapping jitter
      textareaRef.current.style.width = `${Math.max(200, newWidth)}px`;
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
    <div className="base-node">
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className="custom-handle"
        />
      ))}

      <div className="node-header">
        <span className="node-title">Text</span>
      </div>

      <div className="node-content">
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
              width: '100%'
            }}
          />
        </label>
      </div>
    </div>
  );
}
