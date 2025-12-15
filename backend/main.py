from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    print(f"Received pipeline data: {pipeline}") # Debug log
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # Check for DAG
    # Build graph
    adj = {node['id']: [] for node in pipeline.nodes}
    for edge in pipeline.edges:
        source = edge['source']
        target = edge['target']
        if source in adj:
            adj[source].append(target)
            
    # DFS for cycle detection
    visited = set()
    recursion_stack = set()
    
    def has_cycle(node):
        visited.add(node)
        recursion_stack.add(node)
        
        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in recursion_stack:
                return True
                
        recursion_stack.remove(node)
        return False
    
    is_dag = True
    for node in adj:
        if node not in visited:
            if has_cycle(node):
                is_dag = False
                break
                
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
