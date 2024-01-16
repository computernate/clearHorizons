import requests
# System Inputs
# Window durations
dp_ww = .14
dp_gl = .04
dp_agl = .14
dp_glf = .11
dp_aglf = .21
dp_s = .07
# Water Fed Pole Durations
dp_gl_wfp = .05
dp_agl_wfp = .05
dp_glf_wfp = .05
dp_aglf_wfp = .05

above_ground_percent = .1

# Hourly
setupcleanup = .5
supplies_hourly = 5
# Prices
per_gallon = 3.79
miles_per_gallon = 20
profit_margin_monthly = 1.15
profit_margin_biannual = 1.25
profit_margin_single = 1.35
rw = .5
wage = 22

# Budgets
budgets = {
    "budget_season": 1000,
    "equipment_season": 600,
    "phone_bill_season": 600,
    "employee_benefits_season": 600,
    "software_season": 500,
    "marketing_season": 1000,
    "registration_season": 147,
    "workers_comp_season": 833.86,
    "auto_insurance_season": 2981,
    "general_liability_season": 640,
    "inland_marine_season": 102,
    "website_season": 514.53
}
budgets_list = []
for i in budgets:
    budgets_list.append(budgets[i])
budget_sum = sum(budgets_list)
hours_season = 835
per_hour_cost = budget_sum / hours_season + supplies_hourly

# Taxes
taxes = {
    "unemployment_tax": .0068,
    "social_security_tax": .062,
    "medicare_tax": .0145,
    "state_unemployment_tax": .0115,
}
tax_list = []
for i in taxes:
    tax_list.append(taxes[i])
tax_sum = sum(tax_list)

def get_driving_cost_address(address):
    api_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": address,
        "key": "AIzaSyC9et5_WfSEq-uxAGLvEirLzbc4_ILCg3U"
    }
    response = requests.get(api_url, params=params)
    if response.status_code == 200:
        data = response.json()
        lat = data['results'][0]['geometry']['location']['lat']
        lng = data['results'][0]['geometry']['location']['lng']
        return get_driving_cost(lat, lng)
    else:
        return 0


def get_driving_cost(latitude, longitude):
    directions_url = f"https://maps.googleapis.com/maps/api/directions/json?origin=40.508282,-111.846528&destination={latitude},{longitude}&key=AIzaSyC9et5_WfSEq-uxAGLvEirLzbc4_ILCg3U"
    response = requests.get(directions_url)
    data = response.json()
    hours_to_job_site = int(data['routes'][0]['legs'][0]['duration']['value'])/3600
    miles_to_job_site = int(data['routes'][0]['legs'][0]['distance']['value'])/1609
    return (hours_to_job_site*wage)+(miles_to_job_site*per_gallon/miles_per_gallon)


def building_short_quote(data):
    gl=int(data.get('standardPanes', 0))
    agl=int(data.get('highPanes', 0))
    glf=int(data.get('frenchPanes', 0))
    aglf=int(data.get('highFrenchPanes', 0))
    ww=int(data.get('wells', 0))
    address = data['address']

    # Durations
    exterior_duration = (ww*dp_ww)+\
                        (gl*dp_gl)+\
                        (agl*dp_agl)+\
                        (glf*dp_glf)+\
                        (aglf*dp_aglf)\
                        +setupcleanup
    exterior_wfp_duration = (ww*dp_ww)+\
                            (gl*dp_gl_wfp)+\
                            (agl*dp_agl_wfp)+\
                            (glf*dp_glf_wfp)+\
                            (aglf*dp_aglf_wfp)+\
                            setupcleanup

    interior_duration = (((ww+gl+((1-above_ground_percent)*agl))*dp_gl)+\
                         ((above_ground_percent*agl)*dp_agl)+\
                         ((glf+((1-above_ground_percent)*aglf))*dp_glf)+\
                         ((above_ground_percent*aglf)*dp_aglf))

        # TOTALS
    exterior_total = (exterior_duration*wage*(1+tax_sum))+(exterior_duration*per_hour_cost)
    exterior_wfp_total = (exterior_wfp_duration*wage*(1+tax_sum))+(exterior_wfp_duration*per_hour_cost)
    interior_total = (interior_duration*wage*(1+tax_sum))+(interior_duration*per_hour_cost)

    fixed_cost = get_driving_cost_address(address)

    return {
        "wash_quote": (exterior_total + fixed_cost) * profit_margin_single + (interior_total * profit_margin_single),
        "save_info":(exterior_wfp_total + fixed_cost) * profit_margin_monthly + (interior_total * profit_margin_monthly)
    }


def building_all(data):
    ww=int(data['window_well'] )
    gl=int(data['standard_pane'])
    agl=int(data['high_pane'])
    glf=int(data['standard_french_pane'])
    aglf=int(data['high_french_pane'])
    s=int(data['screen'])
    latitude = data['latitude']
    longitude = data['longitude']

        # Durations
    exterior_duration = (ww*dp_ww)+\
                        (gl*dp_gl)+\
                        (agl*dp_agl)+\
                        (glf*dp_glf)+\
                        (aglf*dp_aglf)\
                        +setupcleanup
    exterior_wfp_duration = (ww*dp_ww)+\
                            (gl*dp_gl_wfp)+\
                            (agl*dp_agl_wfp)+\
                            (glf*dp_glf_wfp)+\
                            (aglf*dp_aglf_wfp)+\
                            setupcleanup

    interior_duration = (((ww+gl+((1-above_ground_percent)*agl))*dp_gl)+\
                         ((above_ground_percent*agl)*dp_agl)+\
                         ((glf+((1-above_ground_percent)*aglf))*dp_glf)+\
                         ((above_ground_percent*aglf)*dp_aglf))
    screen_duration = dp_s * s

        # TOTALS
    exterior_total = (exterior_duration*wage*(1+tax_sum))+(exterior_duration*per_hour_cost)
    exterior_wfp_total = (exterior_wfp_duration*wage*(1+tax_sum))+(exterior_wfp_duration*per_hour_cost)
    interior_total = (interior_duration*wage*(1+tax_sum))+(interior_duration*per_hour_cost)
    screen_total = (screen_duration*wage*(1+tax_sum))+(screen_duration*per_hour_cost)

    fixed_cost = get_driving_cost(latitude, longitude)

    return {
        "exterior_single_service": (exterior_total + fixed_cost) * profit_margin_single,
        "exterior_biannual_service": (exterior_total + fixed_cost) * profit_margin_biannual,
        "exterior_multi_service": (exterior_total + fixed_cost) * profit_margin_monthly,
        "exterior_wfp_single_service": (exterior_wfp_total + fixed_cost) * profit_margin_single,
        "exterior_wfp_biannual_service": (exterior_wfp_total + fixed_cost) * profit_margin_biannual,
        "exterior_wfp_multi_service": (exterior_wfp_total + fixed_cost) * profit_margin_monthly,
        "interior_single_service": interior_total * profit_margin_single,
        "interior_biannual_service": interior_total * profit_margin_biannual,
        "interior_multi_service": interior_total * profit_margin_monthly,
        "screen_single_service": screen_total * profit_margin_single,
        "screen_biannual_service": screen_total * profit_margin_biannual,
        "screen_multi_service": screen_total * profit_margin_monthly,
        "rain_warrenty":(exterior_total + fixed_cost)*rw
    }