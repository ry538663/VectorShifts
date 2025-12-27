// llmNode.js

import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {

  return (
    <div className="base-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />

      <div className="node-header">
        <span className="node-title">LLM</span>
      </div>

      <div className="node-content">
        <div>
          <span>This is a LLM.</span>
        </div>
      </div>
    </div>
  );
}
