import onnx

model = onnx.load("model.onnx")
onnx.checker.check_model(model)

print("Model is valid")
print(model.opset_import)