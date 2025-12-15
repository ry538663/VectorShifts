// submit.js
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            console.log("Submitting pipeline...", { nodes, edges }); // Debug log

            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            console.log("Response status:", response.status);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Server Error: ${response.statusText} - ${JSON.stringify(data)}`);
            }

            alert(`
                Pipeline Analysis:
                Number of Nodes: ${data.num_nodes}
                Number of Edges: ${data.num_edges}
                Is DAG: ${data.is_dag}
            `);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Failed to submit pipeline.\n\nError: ${error.message}\n\nCheck the console (F12) for more details.`);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
            <button type="submit" onClick={handleSubmit} className="submit-btn">Submit Pipeline</button>
        </div>
    );
}
