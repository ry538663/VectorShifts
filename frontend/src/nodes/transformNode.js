// transformNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TransformNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-output` }
    ];

    return (
        <BaseNode id={id} data={data} title="Transform" handles={handles}>
            <div style={{ padding: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                Applies transformation logic to the input stream.
            </div>
        </BaseNode>
    );
}
