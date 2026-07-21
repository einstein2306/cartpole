from flask import Flask, jsonify, render_template
#from model import CartpoleModel
from onnx_model import load_model

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/ai')
def ai_mode():
    return render_template("ai.html")

@app.route("/animate")
def fetch_data():

    # Triggering function to fetch the data...
    #gif_data, total_frames = CartpoleModel()
    gif_data, total_frames = load_model()
    if gif_data is not None:
        return jsonify({
            "success":True,
            "gifData":gif_data,
            "Total_frames":total_frames
        })
    return jsonify({
        "success":False
    })
        




if __name__ == "__main__":
    app.run(debug=True)