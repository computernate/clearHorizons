from flask import Flask, render_template, request, jsonify, redirect
from flask_mail import Mail, Message
from flask_cors import CORS

from quotes import building_all, building_short_quote
import os
import mysql.connector
import datetime

app = Flask(__name__)
CORS(app)

CLIENT_ID = os.getenv('JOBBER_CLIENT_ID')
CLIENT_SECRET = os.getenv('JOBBER_CLIENT_SECRET')
REDIRECT_URI = '127.0.0.1:5000/callback'

DB_HOST = 'database-1.ckitblxkmacp.us-east-2.rds.amazonaws.com'
DB_USER = 'admin'
DB_PASS = 'Crystalclear20!'
DB_NAME = 'ClearHorizon'

def get_db_connection():
    conn = mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        port=3306  # Add the port number here
    )
    return conn


@app.route('/', methods=['GET'])
def index():
    source = request.args.get('source', 'other')  # Default to 'unknown' if no source provided
    today = datetime.date.today()

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Check if the entry exists
        cursor.execute('SELECT number FROM sources WHERE date = %s AND source = %s', (today, source))
        result = cursor.fetchone()

        if result:
            new_number = result[0] + 1
            cursor.execute('UPDATE sources SET number = %s WHERE date = %s AND source = %s', (new_number, today, source))
        else:
            cursor.execute('INSERT INTO sources (date, source, number) VALUES (%s, %s, 1)', (today, source))

        conn.commit()  # Commit the transaction
    except Exception as e:
        print(e)
        conn.rollback()  # Roll back the transaction on error
    finally:
        cursor.close()
        conn.close()
    return render_template('index.html')


@app.route('/building_estimate', methods=['POST'])
def get_build_short_estimate():
    data_received = request.json
    final_presentation = building_short_quote(data_received)
    #house_id = create_building(data_received)
    #final_presentation['house_id']=house_id
    return jsonify(final_presentation)


@app.route('/estimate', methods=['POST'])
def estimateSummary():
    # USER INPUTS
    data_received = request.json
    final_presentation = building_all(data_received)
    return jsonify(final_presentation)


@app.route('/send_estimate', methods=['POST'])
def sendEstimate():
    data_received = request.json
    data = {
        "standard_pane":data_received['standard_pane'],
        "standard_french_pane":data_received['standard_french_pane'],
        "high_pane":data_received['high_pane'],
        "high_french_pane":data_received['high_french_pane'],
        "standard_deep":data_received['standard_deep'],
        "french_deep":data_received['french_deep'],
        "window_well":data_received['window_well'],
        "screen":data_received['screen'],

        "latitude":data_received['latitude'],
        "longitude":data_received['longitude'],

        "selectedSingle":data_received['selectedSingle'],
        "selectedInterior":data_received['selectedInterior'],
        "selectedScreens":data_received['selectedScreens'],

        "exclude_window_well_panes_count":data_received['exclude_window_well_panes_count'],
        "exclude_window_well_panes":data_received['exclude_window_well_panes'],
        "exclude_french_panes_count":data_received['exclude_french_panes_count'],
        "exclude_french_panes":data_received['exclude_french_panes'],
        "wfp_selected":data_received['wfp_selected'],
        "own_screen_selected":data_received['own_screen_selected'],
        "screen_repair":data_received['screen_repair'],
        "screen_replacement":data_received['screen_replacement'],

        "first_name":data_received['first_name'],
        "last_name":data_received['last_name'],
        "phone":data_received['phone'],
        "email":data_received['email'],
    }

    html_content = render_template('quote_email.html', data=data)
    msg = Message('Subject of the Email', sender='nateroskelley@gmail.com', recipients=[data.email, 'nateroskelley@gmail.com'])
    msg.html = html_content

    Mail.send(msg)



if __name__ == '__main__':
    app.config['MAIL_SERVER'] = 'your_mail_server'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = 'your_username'
    app.config['MAIL_PASSWORD'] = 'your_password'
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.run()


"""
<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9et5_WfSEq-uxAGLvEirLzbc4_ILCg3U&callback=console.debug&libraries=maps,marker&v=beta">
"""