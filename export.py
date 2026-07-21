
"""
from stable_baselines3 import DQN
import torch

model = DQN.load("logs/dqn/CartPole-v1_1/best_model.zip")

q_net = model.policy.q_net
q_net.eval()

dummy_input = torch.randn(1,4)

torch.onnx.export(
    q_net,
    dummy_input,
    "model.onnx",
    input_names=["observation"],
    output_names=["q_values"],
    opset_version=11
)
"""