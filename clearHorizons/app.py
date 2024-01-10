from flask import Flask, render_template, request, jsonify, redirect
from flask_mail import Mail, Message

from clearHorizons.db_functions import create_building
from clearHorizons.quotes import building_all, building_short_quote
import requests
import os

app = Flask(__name__)

CLIENT_ID = os.getenv('JOBBER_CLIENT_ID')
CLIENT_SECRET = os.getenv('JOBBER_CLIENT_SECRET')
REDIRECT_URI = '127.0.0.1:5000/callback'

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/get_build_step/<step>')
def get_build_step(step):
    print(step)
    return render_template(f'form-steps/step-build-{step}.html')


@app.route('/dashboard')
def dashboard():
    context = {
        "houses":[{'address':"123 strt strt", "id":1},{'address':"456 strt strt", "id":2}],
        "invoices":[
            {
                "paid":"false",
                "house":1,
                "cleanings_left":2,
                "id":1
            },

            {
                "paid": "true",
                "house": 2,
                "cleanings_left": 0,
                "id": 2
            }
        ]
    }
    return render_template("dashboard.html", context=context)


@app.route('/building_estimate', methods=['POST'])
def get_build_short_estimate():
    data_received = request.json
    final_presentation = building_short_quote(data_received)
    house_id = create_building(data_received)
    final_presentation['house_id']=house_id
    return jsonify(final_presentation)


@app.route('/get_quote_step/<int:step>')
def get_quote_step(step):
   return render_template(f'form-steps/step-quote-{step}.html')


@app.route('/estimate', methods=['GET'])
def estimate():
    return render_template('make_building.html')

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


@app.route('/authorize')
def authorize():
    # Redirect user to Jobber's authorization endpoint
    return redirect(
        f"https://api.getjobber.com/api/oauth/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&state=some_random_state"
    )


@app.route('/callback')
def callback():
    code = request.args.get('code')
    state = request.args.get('state')

    # Exchange code for access token
    response = requests.post(
        'https://api.getjobber.com/api/oauth/token',
        data={
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI
        }
    )

    if response.status_code == 200:
        data = response.json()
        access_token = data['access_token']
        refresh_token = data['refresh_token']

        print(access_token)
        print(refresh_token)
        print("SUCCESS!")

        return jsonify({'message': 'User authorized successfully'}), 200
    else:
        return jsonify({'error': 'Failed to obtain access token'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)


@app.errorhandler(404)
def notfound(e):
    return render_template('404.html')


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