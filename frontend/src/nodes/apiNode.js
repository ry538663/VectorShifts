// apiNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const APINode = ({ id, data }) => {
    const handles = [
        { type: 'target', position: Position.Left, id: `${id}-params` },
        { type: 'source', position: Position.Right, id: `${id}-response` }
    ];

    return (
        <BaseNode id={id} data={data} title="API Call" handles={handles}>
            <label>
                Endpoint:
                <input type="text" placeholder="https://api.example.com/v1" />
            </label>
            <label>
                Method:
                <select>
                    <option>GET</option>
                    <option>POST</option>
                </select>
            </label>
        </BaseNode>
    );
}
