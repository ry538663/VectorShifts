// joinNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const JoinNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-inputA`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-inputB`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-joined` }
    ];

    return (
        <BaseNode id={id} data={data} title="Join" handles={handles}>
            <div style={{ padding: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                Merges two data streams into one.
            </div>
        </BaseNode>
    );
}
