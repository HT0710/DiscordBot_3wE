import matplotlib.pyplot as plt
import matplotlib.image as pli
import numpy as np
from PIL import Image
import requests
from io import BytesIO

with open("API.txt", "r") as f:
    part = f.readlines()

response = requests.get(part[0].strip())
imggray = Image.open(BytesIO(response.content)).convert('LA')


def main():
    value = int(part[1])

    imgmat = np.array(list(imggray.getdata(band=0)), float)
    imgmat.shape = (imggray.size[1], imggray.size[0])
    imgmat = np.matrix(imgmat)

    U, sigma, V = np.linalg.svd(imgmat)

    reconstimg = np.matrix(U[:, :value]) * \
        np.diag(sigma[:value]) * np.matrix(V[:value, :])

    plt.imshow(reconstimg, cmap='gray')

    data = Image.fromarray(reconstimg).convert("RGB")

    data.save("SVD.png")


main()
