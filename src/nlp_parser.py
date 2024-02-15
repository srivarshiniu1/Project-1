import sys
import spacy

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

# Plot Templates
plot_templates = {
    "line": "plt.plot({x}, {y})\nplt.show()",
    "scatter": "plt.scatter({x}, {y})\nplt.show()",
    "bar": "plt.bar({x}, {y})\nplt.show()"
}

def identify_plot_type_and_features(description):
    doc = nlp(description.lower())
    plot_type = None
    features = {"x": "x", "y": "y"}  # Default values

    # Simple NLP to identify plot type and features
    for token in doc:
        if token.text in plot_templates:
            plot_type = token.text
        elif token.dep_ in ["pobj", "dobj"]:  # Depending on your NLP logic
            if "x" not in features:
                features["x"] = token.text
            else:
                features["y"] = token.text
    
    return plot_type, features

def generate_code(description):
    plot_type, features = identify_plot_type_and_features(description)
    if plot_type in plot_templates:
        code = plot_templates[plot_type].format(x=features["x"], y=features["y"])
        return code
    else:
        return "Plot type not supported."

if __name__ == "__main__":
    description = sys.argv[1]
    generated_code = generate_code(description)
    print(generated_code)
