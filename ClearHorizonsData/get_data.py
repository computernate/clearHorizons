from openpyxl import load_workbook
import requests

# Load the spreadsheet
wb = load_workbook('workbook.xlsx')

api_key = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIxNTg1ODUsImlzcyI6Imh0dHBzOi8vYXBpLmdldGpvYmJlci5jb20iLCJjbGllbnRfaWQiOiIwMjI3NzYyYi0zNTdjLTRiMWYtYTRiOC0zMjdmZmQzZDNhYTMiLCJzY29wZSI6InJlYWRfY2xpZW50cyB3cml0ZV9jbGllbnRzIHJlYWRfcmVxdWVzdHMgd3JpdGVfcmVxdWVzdHMgcmVhZF9xdW90ZXMgd3JpdGVfcXVvdGVzIHJlYWRfam9icyB3cml0ZV9qb2JzIHJlYWRfaW52b2ljZXMgd3JpdGVfaW52b2ljZXMgcmVhZF9qb2JiZXJfcGF5bWVudHMgcmVhZF91c2VycyB3cml0ZV91c2VycyIsImFwcF9pZCI6IjAyMjc3NjJiLTM1N2MtNGIxZi1hNGI4LTMyN2ZmZDNkM2FhMyIsInVzZXJfaWQiOjIxNTg1ODUsImFjY291bnRfaWQiOjExNDU3OTAsImV4cCI6MTcxNzA5OTM1Nn0.GaQUezeG-UOfHgM_pvmkYALlGAhBbxjF0gEtp9EOubQ"
objects_per_page = 10

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

# Iterate over all sheets
for sheet_name in wb.sheetnames:
    # Check if sheet name starts with 'JOBBER_AUTO_'
    if sheet_name.startswith('J_A_'):
        sheet = wb[sheet_name]

        # Read the headers from the first row
        headers = [cell.value for cell in sheet[1]]

        # Extract XXX from the sheet name
        table_name = sheet_name[len('J_A_'):]

        # Check if there are existing IDs in the first column
        existing_ids = [sheet.cell(row=row, column=1).value for row in range(2, sheet.max_row + 1) if
                        sheet.cell(row=row, column=1).value]

        # Set the initial start_id for pagination
        start_id = existing_ids[-1] if existing_ids else None

        nested_objects = table_name.split('_')
        head_objects = ""
        tail_objects = ""
        for object in nested_objects[1:]:
            head_objects+=f"id,{object}{{nodes{{"
            tail_objects+="}}"

        print(f"before_start {sheet_name}")
        offset = 0
        while True:
            # Construct the GraphQL query based on the headers, table name, and start_id
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
            print(f'Getting {nested_objects[-1].capitalize()}')
            # Send the query to Jobber's API
            url = "https://api.getjobber.com/api/graphql"
            #CLient id: 0227762b-357c-4b1f-a4b8-327ffd3d3aa3
            #Client secret: e33150e0de0c2d560251a06d6867fcd9774357bd0b938a9f1841843e3f0cc1dc
            # Set the headers
            request_headers = {
                "Authorization": f"Bearer {api_key}",
                "X-JOBBER-GRAPHQL-VERSION": "2023-11-15"
            }

            response = requests.post(url, headers=request_headers, json={'query': query})

            # Check if the request was successful
            if response.status_code == 200:
                data = response.json()
                # Process the data as needed
                if not data['data'][nested_objects[0]]['nodes']:
                    break  # No more data available
            else:
                print(f"Failed to fetch data from Jobber's API {response.status_code}")
                data = None
                break

            # Parse the response and populate the sheet
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
                    field_name=field+'_ID'
                    sheet.cell(row=row_num+offset, column=col_num+len(headers)+1, value=node[field_name])

            # Update the start_id for the next iteration
            if not data['data'][nested_objects[0]]['pageInfo']['hasNextPage']:
                break
            offset+=len(flattened_data)
            start_id = data['data'][nested_objects[0]]['pageInfo']['endCursor']

# Save the modified workbook
wb.save('update_workbook.xlsx')