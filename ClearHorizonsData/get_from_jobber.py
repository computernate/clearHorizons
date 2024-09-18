import requests
import os
jobber_api_key = os.getenv("JOBBER_API_KEY", "")
objects_per_page = 10
import time

def flatten_data(data, prop_list, current_level=0, ids=None):
    if ids is None:
        ids = {}
    # Base case: If we are at the last property, we process the nodes directly
    if current_level == len(prop_list) - 1:
        final_nodes = data[prop_list[current_level]]['nodes']
        result = []
        for node in final_nodes:
            item = node.copy()  # Start with the base node data
            # Add IDs from previous levels
            for id_name, id_value in ids.items():
                item[f"{id_name}_ID"] = id_value
            result.append(item)
        return result
    # Recursive case: Navigate deeper into the structure
    results = []
    prop = prop_list[current_level]
    nodes = data[prop]['nodes']
    for node in nodes:
        # Update the IDs with the current node's ID
        new_ids = ids.copy()
        new_ids[prop] = node['id']
        # Recursive call to process the next level
        results.extend(flatten_data(node, prop_list, current_level + 1, new_ids))
    return results

# Function to send requests and get data
def get_data(query):
    url = "https://api.getjobber.com/api/graphql"
    headers = {
        "Authorization": f"Bearer {jobber_api_key}",
        "X-JOBBER-GRAPHQL-VERSION": "2023-11-15"
    }

    response = requests.post(url, headers=headers, json={'query': query})
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data from JOBBER's API: {response.status_code}")
        return None

def get_from_jobber(sheet, sheet_name):

    headers = [cell.value for cell in sheet[1]]
    table_name = sheet_name[4:]
    existing_ids = [sheet.cell(row=row, column=1).value for row in range(2, sheet.max_row + 1) if
                    sheet.cell(row=row, column=1).value]
    start_id = existing_ids[-1] if existing_ids else None

    nested_objects = table_name.split('_')
    head_objects = ""
    tail_objects = ""
    for obj in nested_objects[1:]:
        head_objects += f"id,{obj}{{nodes{{"
        tail_objects += "}}"

    offset = 0
    while True:
        query_fields = []
        for header in headers:
            nested_fields = header.split('_')
            nested_structure = ''
            for field in nested_fields[:-1]:
                nested_structure += f'{field}{{'
            nested_structure += nested_fields[-1]
            nested_structure += '}' * (len(nested_fields) - 1)
            query_fields.append(nested_structure)

        if start_id:
            query = f'''
            query {nested_objects[0].capitalize()}Query {{
              {nested_objects[0]}(first: {objects_per_page}, after: "{start_id}") {{
                nodes {{
                    {head_objects}
                  {",".join(query_fields)}
                  {tail_objects}
                }}
                pageInfo {{
                  endCursor
                  hasNextPage
                }}
              }}
            }}
            '''
        else:
            query = f'''
            query {nested_objects[0].capitalize()}Query {{
              {nested_objects[0]}(first: {objects_per_page}) {{
                nodes {{
                    {head_objects}
                  {",".join(query_fields)}
                  {tail_objects}
                }}
                pageInfo {{
                  endCursor
                  hasNextPage
                }}
              }}
            }}
            '''
        data = get_data(query)
        print(data)
        if not data or not data['data'][nested_objects[0]]['nodes']:
            break

        flattened_data = flatten_data(data['data'], nested_objects)

        for row_num, node in enumerate(flattened_data, start=2):
            for col_num, field in enumerate(headers, start=1):
                nested_fields = field.split('_')
                nested_value = node
                try:
                    for nested_field in nested_fields:
                        nested_value = nested_value.get(nested_field, {})
                    sheet.cell(row=row_num+offset, column=col_num, value=nested_value)
                except:
                    sheet.cell(row=row_num+offset, column=col_num, value='n/a')
            for col_num, field in enumerate(nested_objects[:-1]):
                field_name = field + '_ID'
                sheet.cell(row=row_num+offset, column=col_num+len(headers)+1, value=node[field_name])

        if not data['data'][nested_objects[0]]['pageInfo']['hasNextPage']:
            break

        offset += len(flattened_data)
        start_id = data['data'][nested_objects[0]]['pageInfo']['endCursor']
        time.sleep(.5)