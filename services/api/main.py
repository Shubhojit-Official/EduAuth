import cv2
import numpy as np
from services.ocr.pipeline import CertificatePipeline

def load_image(img_path: str)-> np.ndarray:
    return cv2.imread(img_path)

def main():
    path = "data_t/cert_1.jpg"
    img = load_image(path)

    pipeline = CertificatePipeline(mode="auto", debug=True)
    text = pipeline.run(img)

    print("Extracted Text:", text)

if __name__ == "__main__":
    main()
