
import mysql.connector

def connect_to_db():
    return mysql.connector.connect(
        host="127.0.0.1",  # Typically 'localhost' or an IP address
        user="root",
        password="3nT3R#idfl",
        database="ClearHorizons"
    )

def create_building(data):
    conn = connect_to_db()
    cursor = conn.cursor()

    sql_query = f"""INSERT INTO Buildings (floors, longitude, latitude, address, standardWindows, frenchWindows, standardHighWindows, frenchHighWindows, wellWindows, screens) 
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"""
    cursor.execute(sql_query, (data['floors'], data['longitude'],data['latitude'],data['address'],data['standard'],data['french'],data['standardHigh'],data['frenchHigh'],data['well'],data['screen']))
    conn.commit()
    last_inserted_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return last_inserted_id