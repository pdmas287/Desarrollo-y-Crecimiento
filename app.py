from flask import Flask, render_template, url_for, redirect

app = Flask(__name__, static_url_path='/static')

# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/cuestionario')
def cuestionario():
    return render_template('cuestionario.html')

@app.route('/resultados')
def resultados():
    return render_template('resultados.html')

@app.route('/')
def redirect_to_cuestionario():
    return redirect(url_for('cuestionario'))

if __name__ == '__main__':
    app.run(debug=True)
