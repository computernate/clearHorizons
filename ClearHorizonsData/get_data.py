from openpyxl import load_workbook
import requests

# Load the spreadsheet
#wb = load_workbook('/workspaces/clearHorizons/ClearHorizonsData/workbook.xlsx')
wb = load_workbook('/home/n8ros/Documents/clearHorizons/ClearHorizonsData/workbook.xlsx')

# Define API keys and endpoints
jobber_api_key = "YOUR_JOBBER_API_KEY"
#divvy_api_key = ""
objects_per_page = 10

# Function to send requests and get data
def get_data(api_name, query):
    if api_name == 'jobber':
        url = "https://api.getjobber.com/api/graphql"
        headers = {
            "Authorization": f"Bearer {jobber_api_key}",
            "X-JOBBER-GRAPHQL-VERSION": "2023-11-15"
        }
    elif api_name == 'divvy':
        url = "https://api.divvy.co/graphql"
        headers = {
            "x-divvy-api-token": divvy_api_key,
            "x-api-version": "2"
        }
    else:
        raise ValueError("Unsupported API name")

    response = requests.post(url, headers=headers, json={'query': query})
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch data from {api_name}'s API: {response.status_code}")
        return None

# Iterate over all sheets
for sheet_name in wb.sheetnames:
    if sheet_name.startswith('J_A_'):
        api_name = 'jobber'
    elif sheet_name.startswith('D_A_'):
        api_name = 'divvy'
    else:
        continue  # Skip sheets that don't match the prefix

    sheet = wb[sheet_name]
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
        query = '''query {
  currentUser {
    company {
      budgets(first: 1) {
        edges {
          node {
            id
            name
            users(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
}'''
        print(f'Getting {nested_objects[-1].capitalize()} from {api_name}')
        print(query)
        data = get_data(api_name, query)
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

# Save the modified workbook
wb.save('/home/n8ros/Documents/clearHorizons/ClearHorizonsData/update_workbook.xlsx')