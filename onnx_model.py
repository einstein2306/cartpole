
import onnxruntime as ort
import numpy as np
import gymnasium as gym
import base64
from io import BytesIO
from PIL import Image

def load_model():
    env = gym.make("CartPole-v1", render_mode="rgb_array")
    session = ort.InferenceSession("model.onnx")
    input_name = session.get_inputs()[0].name

    frames = []

    for _ in range(1):
       
        obs, info = env.reset()

        while True:
            obs = np.expand_dims(obs, axis=0).astype(np.float32)
            action = session.run(None, {input_name: obs})[0]
            action = int(np.argmax(action))  # Get the action with the highest Q-value
            obs, reward, terminated, truncated, info = env.step(action)
            frames.append(env.render())

            if terminated or truncated:
                break

    buffer = BytesIO()   
    images = [Image.fromarray(frame) for frame in frames]
    images[0].save(buffer,format="GIF",save_all=True,append_images=images[1:],duration=50,loop=1)
    buffer.seek(0)
    gif_data = base64.b64encode(buffer.read()).decode('utf-8')

    return gif_data , len(frames)


gif_data, num_frames = load_model()
print(num_frames)