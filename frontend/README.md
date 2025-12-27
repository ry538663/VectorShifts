# VectorShifts Technical Assessment

This project contains the technical assessment submission, consisting of a React-based frontend and a Python FastAPI backend. The application is designed to visualize and analyze processing pipelines using a node-based interface.

## 📂 Folder Structure

The project is organized into two main directories:

```
root
├── backend/      # Python FastAPI backend application
└── frontend/     # React frontend application
```

---

## 🖥️ Frontend

The frontend is a React application built with `react-flow` for the node-based UI and `zustand` for state management.

### Tech Stack
-   **Framework**: React (v18)
-   **Visual Library**: React Flow (`reactflow`)
-   **State Management**: Zustand
-   **Styling**: Standard CSS / React Scripts

### Setup & Installation

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    The application will typically run on `http://localhost:3000`.

---

## ⚙️ Backend

The backend is a lightweight FastAPI application that processes the pipeline data. It currently provides endpoints to parse the pipeline and detect if the constructed graph constitutes a Directed Acyclic Graph (DAG).

### Tech Stack
-   **Framework**: FastAPI
-   **Language**: Python 3.x

### Setup & Installation

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  (Optional but recommended) Create and activate a virtual environment.

3.  Install necessary dependencies (assuming `fastapi` and `uvicorn` are required):
    ```bash
    pip install fastapi uvicorn
    ```

4.  Run the server:
    ```bash
    # Run with uvicorn directly
    uvicorn main:app --reload
    ```
    The server will run on `http://127.0.0.1:8000` by default.

### Key Endpoints

-   `GET /`: Health check, returns `{'Ping': 'Pong'}`.
-   `POST /pipelines/parse`: Accepts a pipeline configuration (nodes and edges) and returns:
    -   Number of nodes
    -   Number of edges
    -   `is_dag`: Boolean indicating if the graph is a Directed Acyclic Graph.
