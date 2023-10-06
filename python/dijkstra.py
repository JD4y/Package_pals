import json

from dijkstar import Graph, find_path
import numpy as np
from fastapi import FastAPI, Request, HTTPException, Query
from typing import Optional

app = FastAPI()

# Create a graph
graph = Graph()

# Initialize a dictionary to store all the data
all_data = {}

def to_json(start, end, path, effort, earnings):
    global all_data

    data = {
        "start_node": start,
        "end_node": end,
        "effort": effort,
        "earnings": earnings,
        "path": path
    }

    key = f"end_parcel_{end}"
    if key not in all_data:
        all_data[key] = []
    all_data[key].append(data)


def normalize_edge(edges):
    # Separate the features (values) from the edges data
    values = np.array([edge[2:] for edge in edges])

    # Normalize the values column-wise to [0, 1]
    min_values = np.min(values, axis=0)
    max_values = np.max(values, axis=0)
    normalized_values = (values - min_values) / (max_values - min_values)

    # Combine the normalized values with nodes and return edges
    normalized_edges = [(edge[0], edge[1], *normalized_values[i]) for i, edge in enumerate(edges)]
    return normalized_edges


def graph_generator(edges, distanceWeight, incentiveWeight):
    for edge in normalize_edge(edges):
        node1, node2, distance, incentive = edge
        aggregated_value = model(distance, incentive, distanceWeight, incentiveWeight)
        graph.add_edge(node1, node2, aggregated_value)
    return graph


def calculate_total_earnings(path, edges):
    total_earnings = 0

    # Iterate through the path and accumulate the earnings
    for i in range(len(path) - 1):
        node1 = path[i]
        node2 = path[i + 1]

        # Find the edge corresponding to the nodes
        edge = next((edge for edge in edges if edge[0] == node1 and edge[1] == node2), None)

        if edge is not None:
            earnings = edge[3]  # Earnings are in the last column of the edge array
            total_earnings += earnings

    return total_earnings


def calculate_total_effort(path, edges):
    total_efforts = 0

    # Iterate through the path and accumulate the earnings
    for i in range(len(path) - 1):
        node1 = path[i]
        node2 = path[i + 1]

        # Find the edge corresponding to the nodes
        edge = next((edge for edge in edges if edge[0] == node1 and edge[1] == node2), None)

        if edge is not None:
            efforts = edge[2]  # Earnings are in the last column of the edge array
            total_efforts += efforts

    return total_efforts


def model(distance, incentive, distanceWeight, incentiveWeight):
    # The weights define how much the impact of a specific edge value is. This might be influenced by a user input.
    return np.abs((distance * distanceWeight) - (incentive * incentiveWeight))


def generate_jobs(edges, distanceWeight=0.5, incentiveWeight=0.5):
    graph = graph_generator(edges, distanceWeight, incentiveWeight)

    # Find a path from node 1 to node 4
    start_node = 1

    for end in range(2, 4):
        end_node = end
        path_info = find_path(graph, start_node, end_node)
        path_to_dropOff = find_path(graph, end_node, 4)

        # Things in the json: starting point, end point, specific parcel job, path, incentive, distance?
        start = start_node
        end = end_node
        # parcelsjob = end
        path = path_info.nodes + path_to_dropOff.nodes[1:]
        # cost = path_info.total_cost + path_to_dropOff.total_cost
        effort = calculate_total_effort(path, edges)
        earnings = calculate_total_earnings(path, edges)

        # Store the path information for each run
        to_json(start, end, path, effort, earnings)


# Example Usage
# http://0.0.0.0:8000/getjobs?edges=%5B%5B1%2C2%2C10%2C50%5D%2C%5B2%2C3%2C125%2C10%5D%2C%5B3%2C4%2C108%2C0%5D%2C%5B1%2C3%2C150%2C6%5D%2C%5B1%2C4%2C200%2C0%5D%2C%5B2%2C4%2C175%2C0%5D%2C%5B2%2C1%2C120%2C7%5D%2C%5B3%2C1%2C140%2C5%5D%2C%5B3%2C2%2C130%2C8%5D%2C%5B4%2C1%2C100%2C4%5D%2C%5B4%2C2%2C115%2C6%5D%5D&distanceWeight=0.5&incentiveWeight=0.3
@app.get("/getjobs")
async def getjobs(
    edges: str = Query(...),
    distanceWeight: Optional[float] = Query(0.5),
    incentiveWeight: Optional[float] = Query(0.5)
):
    try:
        edges = json.loads(edges)
        generate_jobs(edges, distanceWeight, incentiveWeight)
        return all_data  # Return the generated data as the API response
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON in request body")

if __name__ == '__main__':
  generate_jobs()
