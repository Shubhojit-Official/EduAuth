import pytesseract
import numpy as np
import cv2
import os
from .preprocessing import Preprocessor

class OcrEngine:
    def __init__(self, mode: str = "auto", ocr_config: str = "--psm 6",
                 preprocessor: Preprocessor = None):
        assert mode in ["text", "signature", "auto"], "Invalid mode. Use 'text', 'signature', or 'auto'."
        self.mode = mode
        self.ocr_config = ocr_config
        self.preprocessor = preprocessor or Preprocessor()

    def _ocr_with_confidence(self, img, tag: str = "ocr"):
        data = pytesseract.image_to_data(img, config=self.ocr_config, output_type=pytesseract.Output.DICT)
        text = " ".join([w for w in data['text'] if w.strip()])
        confidences = [conf for conf in data['conf'] if conf != -1]
        avg_conf = np.mean(confidences) if confidences else 0

        if self.preprocessor.debug:
            debug_img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR) if len(img.shape) == 2 else img.copy()
            for i, word in enumerate(data['text']):
                if word.strip():
                    x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]
                    cv2.rectangle(debug_img, (x, y), (x+w, y+h), (0, 255, 0), 2)
                    cv2.putText(debug_img, word, (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)

            cv2.imwrite(os.path.join(self.preprocessor.debug_dir, f"{tag}_ocr_result_conf{avg_conf:.2f}.jpg"), debug_img)

        return text, avg_conf

    def _auto_mode(self, img):
        text_img = self.preprocessor.preprocess_text(img, tag="auto_text")
        sig_img = self.preprocessor.preprocess_signature(img, tag="auto_signature")

        text_out, conf_text = self._ocr_with_confidence(text_img, tag="auto_text")
        sig_out, conf_sig = self._ocr_with_confidence(sig_img, tag="auto_signature")

        print(f"[DEBUG] Text mode conf: {conf_text:.2f}, Signature mode conf: {conf_sig:.2f}")

        return (text_img, text_out) if conf_text >= conf_sig else (sig_img, sig_out)

    def extract_text(self, img):
        if self.mode == "text":
            processed = self.preprocessor.preprocess_text(img)
            text, _ = self._ocr_with_confidence(processed, tag="text")
            return text
        elif self.mode == "signature":
            processed = self.preprocessor.preprocess_signature(img)
            text, _ = self._ocr_with_confidence(processed, tag="signature")
            return text
        else:
            _, text = self._auto_mode(img)
            return text
