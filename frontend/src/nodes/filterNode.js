// filterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-filtered` }
    ];

    return (
        <BaseNode id={id} data={data} title="Filter" handles={handles}>
            <label>
                Condition:
                <input type="text" placeholder="e.g. value > 0" />
            </label>
        </BaseNode>
    );
}
