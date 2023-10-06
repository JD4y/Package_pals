import json

from dijkstar import Graph, find_path
import numpy as np
from fastapi import FastAPI
app = FastAPI()

# Create a graph
graph = Graph()


def data_loader():
    # Add edges (nodes, nodes, edge_weight)
    # Weights are distance, and incentive.
    edges = [
        (1, 2, 10, 50),
        (2, 3, 125, 10),
        (3, 4, 108, 0),
        (1, 3, 150, 6),
        (1, 4, 200, 0),
        (2, 4, 175, 0),
        (2, 1, 120, 7),
        (3, 1, 140, 5),
        (3, 2, 130, 8),
        (4, 1, 100, 4),
        (4, 2, 115, 6)
    ]

    return edges


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


def graph_generator(edges):
    for edge in normalize_edge(edges):
        node1, node2, value1, value2 = edge
        aggregated_value = model(value1, value2)
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


def model(distance, incentive, distanceWeight = 0.5, incentiveWeight = 0.5):
  # The weights define how much the impact of a specific edge value is. This might be influenced by a user input.
  return distance * distanceWeight + (1 - incentive) * incentiveWeight


def generate_jobs(distanceWeight=0.5, incentiveWeight=0.5):
    edges = data_loader()
    graph = graph_generator(edges)

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

        # Save all the data to a single JSON file
    output_file = "all_path_info.json"
    with open(output_file, 'w') as json_file:
        json.dump(all_data, json_file, indent=4)


@app.get("/jobs")
def get_jobs():
  generate_jobs()
  return all_data



if __name__ == '__main__':
  generate_jobs()
