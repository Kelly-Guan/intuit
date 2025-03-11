'''
Expense Forecasting System
Scenario: You are part of a team at Intuit working on an advanced feature for QuickBooks that helps small business owners 
forecast future expenses based on historical data. 
The goal is to provide predictive insights that can help businesses better manage their budgets and plan for future financial needs.

Instructions: Write a function in your preferred programming language that takes expense_data as 
input and returns predicted expenses for each category using a simple moving average of the last three months.

Initial Task (Part 1):
Implement a function that analyzes historical expense data and predicts the next month’s expenses for various categories. 
You are given a list of past monthly expenses for several categories.

Input: 
expense_data = {  
    "Office Supplies": [120, 110, 150, 130, 140],  
    "Marketing": [200, 240, 220, 210, 230],  
    "Utilities": [90, 95, 100, 85, 90],  
    "Rent": [1000, 1000, 1000, 1000, 1000]  
}


output 
A dictionary with categories as keys and predicted expenses for the next month as values.
{  
    "Office Supplies": 135,  
    "Marketing": 225,  
    "Utilities": 92,  
    "Rent": 1000  
}

Note: For simplicity, assume a simple moving average for prediction.

part 2:
Enhance the forecasting model by introducing weighted averages where more recent months are given higher importance. 
Adjust your function to calculate a weighted average for predictions.

part 3:
Discuss and potentially design a system that incorporates external economic factors (like inflation rates, economic downturns, etc.) 
to adjust the forecasts more dynamically. This could involve accessing external APIs for real-time data, processing it, and integrating it into the forecasting logic.

'''


# Please note the ui - associated with this is to be able to visualize my solution - not entirely my own 

from collections import defaultdict
from datetime import datetime


# simple moving avg of last three months - unweighted
def simple_moving_avg(expense_data: dict) -> dict:
    # assume each item is unique,
    # assume the past monthly expenses for each category - gives a different number of past months 
    # assume oldest to newest - is left to right (meaning right has the newest items)

    # SMA take the last three months 
    predicted_cost_dict = defaultdict(int)

    for category, expenses in expense_data.items():
        predicted_cost = sum(expenses[-3:]) / 3  
        predicted_cost_dict[category] = predicted_cost            

    return predicted_cost_dict


# part 2 
def weighted_moving_average_last3(expense_data):
    # Older months get lower weights
    weights = [0.2, 0.3, 0.5]
    '''
    Last month → 50% weight
    Second last month → 30% weight
    Third last month → 20% weight
    '''

    predicted_cost_dict = defaultdict(int)

    for category, expenses in expense_data.items():
        weighted_avg = 0
        for w, x in zip(weights, expenses[-3:]):
            weighted_avg += w * x 
        predicted_cost_dict[category] = round(weighted_avg)  # Round to nearest integer

    return predicted_cost_dict

# part 3:
# Discuss and potentially design a system that incorporates external economic factors (like inflation rates, economic downturns, etc.) 
# to adjust the forecasts more dynamically. This could involve accessing external APIs for real-time data, processing it, and integrating it into the forecasting logic.
'''
Inflation Rates 
- Call external APIs to get the latest inflation rate or industry-specific cost indexes.
- Cache this data to avoid excessive API requests.

Modify the predictions from part 2 by factoring in the inflation-adjusted growth rate per category.
Adjusted Forecast = Weighted Moving Average Prediction x (1 + Inflation Rate / 100)


- Annual Inflation Rate (%)
    - office supplies - high inflation impact 
    - marketing - low inflation impact 
    - utiltities - sensitive to economic changes 
    - rent - less sensitive but potential impact 

- Industry Growth Rate (%)

- Seasonal Factor 
    - office supplies - more expensive in back to school season 
    - marketing - more expenseve during holdiary seasons 
    - utiltities - more expensive in weather temperments 
    - rent - no seasonal patterns 

'''

indicators = {
    'inflation_rate': 2.5,  
    'industry_growth': 1.8,  
    'consumer_confidence': 0.0, 
    'seasonal_factor': 1.0,  
}

def econmic_impact(indicators): 
    current_month = datetime.now().month
    if 10 <= current_month <= 12:
        indicators["seasonal_factor"] = 1.15 # Q4 has increase 
    elif 1 <= current_month <= 3:
        indicators["seasonal_factor"] = 0.95 # Q1 has decrease 



expense_data = {  
    "Office Supplies": [120, 110, 150, 130, 140],  
    "Marketing": [200, 240, 220, 210, 230],  
    "Utilities": [90, 95, 100, 85, 90],  
    "Rent": [1000, 1000, 1000, 1000, 1000]  
}

