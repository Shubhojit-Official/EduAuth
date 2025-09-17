import cv2
import numpy as np
import os

class Preprocessor:
    def __init__(self, scale: float = 1.5, debug: bool = False, debug_dir: str = "preprocess_debug"):
        self.scale = scale
        self.debug = debug
        self.debug_dir = debug_dir

        if self.debug:
            os.makedirs(self.debug_dir, exist_ok=True)

    def preprocess_text(self, img: np.ndarray, tag: str = "text") -> np.ndarray:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        text_img = cv2.adaptiveThreshold(
            gray, 255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            35, 25
        )
        kernel = np.ones((2, 2), np.uint8)
        text_img = cv2.morphologyEx(text_img, cv2.MORPH_OPEN, kernel)
        text_img = cv2.morphologyEx(text_img, cv2.MORPH_CLOSE, kernel)

        text_img = cv2.resize(text_img, None, fx=self.scale, fy=self.scale, interpolation=cv2.INTER_LINEAR)

        if self.debug:
            cv2.imwrite(os.path.join(self.debug_dir, f"{tag}_preprocessed_text.jpg"), text_img)

        return text_img

    def preprocess_signature(self, img: np.ndarray, tag: str = "signature") -> np.ndarray:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        sharpen_kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
        signature_img = cv2.filter2D(gray, -1, sharpen_kernel)

        signature_img = cv2.resize(signature_img, None, fx=self.scale, fy=self.scale, interpolation=cv2.INTER_LINEAR)

        if self.debug:
            cv2.imwrite(os.path.join(self.debug_dir, f"{tag}_preprocessed_signature.jpg"), signature_img)

        return signature_img
