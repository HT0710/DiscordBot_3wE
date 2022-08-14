import numpy as np
from PIL import Image
import requests
from io import BytesIO
import time

path = "./src/commands/others/ai/resources/"

with open(path + "API.txt", "r") as f:
    part = f.readlines()

file = open(path + "API.txt", "w")

response = requests.get(part[0].strip())
img_gray = Image.open(BytesIO(response.content)).convert('LA')


value = int(part[1])

imgmat = np.array(list(img_gray.getdata(band=0)), float)
imgmat.shape = (img_gray.size[1], img_gray.size[0])
imgmat = np.matrix(imgmat)

U, sigma, V = np.linalg.svd(imgmat)

reconstimg = np.matrix(U[:, :value]) * \
    np.diag(sigma[:value]) * np.matrix(V[:value, :])

data = Image.fromarray(reconstimg).convert("L")

data.save(path + "SVD.png")
time.sleep(3)
file.write("done")
file.close
